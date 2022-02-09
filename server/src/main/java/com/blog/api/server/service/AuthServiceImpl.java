package com.blog.api.server.service;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.MemberDTO;
import com.blog.api.server.model.Token;
import com.blog.api.server.repository.RedisRepository;
import com.blog.api.server.repository.UserRepository;
import com.blog.api.server.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    RedisRepository redisRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Member getAuth(HttpServletRequest request) {
        String token = tokenProvider.resolveAccessToken(request);

        if(StringUtils.hasText(token)) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            return (Member) authentication.getPrincipal();
        } else {
            return null;
        }
    }

    @Override
    public MemberDTO reissue(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String token = tokenProvider.resolveAccessToken(request);
            HashMap<String, String> payloadMap = JwtUtil.getPayloadByToken(token);
            String email = payloadMap.get("sub");

            Optional<Token> refreshToken = redisRepository.findById(email);
            refreshToken.orElseThrow(
                    () -> new CustomException(ErrorCode.UNAUTHORIZED)
            );

            boolean isTokenValid = tokenProvider.validateToken(refreshToken.get().getValue(), request);

            if(isTokenValid) {
                Optional<Member> member = userRepository.findById(email);

                if(member.isPresent()) {
                    Token newAccessToken = tokenProvider.createAccessToken(member.get());
                    Token newRefreshToken = tokenProvider.createRefreshToken(member.get());

                    tokenProvider.setHeaderAccessToken(response, newAccessToken.getValue());

                    redisRepository.save(newRefreshToken);

                    return MemberDTO.builder()
                            .accessToken(newAccessToken.getValue())
                            .member(member.get())
                            .build();
                }
            }
        } catch(ExpiredJwtException e) {
            throw new CustomException(ErrorCode.JWT_REFRESH_TOKEN_EXPIRED);
        }
        return null;
    }
}
