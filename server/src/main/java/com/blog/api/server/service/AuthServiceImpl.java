package com.blog.api.server.service;

import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.Token;
import com.blog.api.server.repository.RedisRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    RedisRepository redisRepository;

    @Override
    public Member getAuth(String accessToken) {
        try {
            if(accessToken != null) {
                Authentication authentication = tokenProvider.getAuthentication(accessToken);

                return (Member) authentication.getPrincipal();
            } else {
                return null;
            }
        } catch(ExpiredJwtException e) {
            return null;
        }
    }
}
