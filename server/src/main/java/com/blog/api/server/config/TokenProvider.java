package com.blog.api.server.config;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.ResponseVO;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.Token;
import com.blog.api.server.repository.RedisRepository;
import com.blog.api.server.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Security;
import java.time.Duration;
import java.util.*;

@Slf4j
@Component
public class TokenProvider {

    @Value("${jwt.security.key}")
    private String secretKey;
    @Value("${jwt.response.header}")
    private String jwtHeader;
    @Value("${jwt.token.prefix}")
    private String jwtTokenPrefix;
    private long accessTokenValidTime = Duration.ofMinutes(30).toMillis();
    private long refreshTokenValidTime = Duration.ofDays(14).toMillis();

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private RedisRepository redisRepository;

    // secretKey를 Base64로 인코딩
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public Token createAccessToken(Member member) {
        return createToken(member, accessTokenValidTime);
    }

    public Token createRefreshToken(Member member) {
        return createToken(member, refreshTokenValidTime);
    }

    public Token createToken(Member member, long tokenValidTime) {
        Claims claims = Jwts.claims().setSubject(member.getEmail());
        claims.put("roles", member.getRole());
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims) // 정보
                .setIssuedAt(now) // 토큰 발행 시간
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // 토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return Token.builder()
                .key(member.getEmail())
                .value(token)
                .expiredTime(tokenValidTime)
                .build();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        HashMap<String, String> payloadMap = JwtUtil.getPayloadByToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(payloadMap.get("sub"));
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    // 토큰으로 회원 정보 조회
    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // GET ACCESS TOKEN BY HEADER
    public String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(jwtHeader);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(jwtTokenPrefix)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String token, HttpServletRequest request) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch(SecurityException | MalformedJwtException e) {
            log.error("Invalid JWT signature");
            return false;
        } catch(UnsupportedJwtException e) {
            log.error("Unsupported JWT token");
            return false;
        } catch(IllegalArgumentException e) {
            log.error("JWT token is invalid");
            return false;
        }
    }

    // ACCESS TOKEN SET HEADER
    public void setHeaderAccessToken(HttpServletResponse response, String accessToken) {
        response.setHeader(jwtHeader, accessToken);
    }
}
