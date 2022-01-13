package com.blog.api.server.config;

import com.blog.api.server.model.Member;
import com.blog.api.server.model.Token;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Date;

@Component
public class TokenProvider {

    @Value("${jwt.security.key}")
    private String secretKey;
    private long accessTokenValidTime = 1000L * 60 * 30; // 30 min
    private long refreshTokenValidTime = 1000L * 60 * 1; // 60 min

    @Autowired
    UserDetailsService userDetailsService;

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
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰으로 회원 정보 조회
    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // GET ACCESS TOKEN BY HEADER
    public String resolveAccessToken(HttpServletRequest request) {
        if(request.getHeader("X-AUTH-TOKEN") != null) {
            return request.getHeader("X-AUTH-TOKEN");
        }
        return null;
    }

    // GET REFRESH TOKEN BY HEADER
    public String resolveRefreshToken(HttpServletRequest request) {
        if(request.getHeader("REFRESH-TOKEN") != null) {
            return request.getHeader("REFRESH-TOKEN");
        }
        return null;
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
//            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            System.out.println("validate token error : " + e.getMessage());
            return false;
        }
    }

    // ACCESS TOKEN SET HEADER
    public void setHeaderAccessToken(HttpServletResponse response, String accessToken) {
        response.setHeader("X-AUTH-TOKEN", accessToken);
    }

    // REFRESH TOKEN SET HEADER
    public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken) {
        response.setHeader("REFRESH-TOKEN", refreshToken);
    }

    // TODO : REDIS 연동
    public boolean existRefreshToken(String refreshToken) {
        return false;
    }
}
