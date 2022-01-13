package com.blog.api.server.config;

import com.blog.api.server.model.Member;
import com.blog.api.server.model.Token;
import com.blog.api.server.repository.RedisRepository;
import com.blog.api.server.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisRepository redisRepository;

    public JwtAuthenticationFilter(TokenProvider provider) {
        tokenProvider = provider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("JWT doFilterInternal");

            String accessToken = tokenProvider.resolveAccessToken(request);

            log.info(accessToken, "access token");

            boolean isTokenValid = tokenProvider.validateToken(accessToken);
            System.out.println(isTokenValid + "isTokenValid");

            if(accessToken != null && tokenProvider.validateToken(accessToken)) {
                log.info("setAuthentication");
                this.setAuthentication(accessToken);
            }
        } catch(ExpiredJwtException e) {
            System.out.println(e.getClaims());
//            MemberModel memberModel = memberDAO.selectMemberOauth(MemberModel.builder()
//                    .uid(e.getClaims().getSubject())
//                    .build());
//            if (ObjectUtils.isNotEmpty(memberModel)) {
//                refreshToken = memberModel.getToken();
//            }
//
//            log.error("JWT expired error : {} ", e);
        }
        filterChain.doFilter(request, response);
    }

//    @Override
    protected void doFilterInternal2(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JWT doFilterInternal");

        String accessToken = tokenProvider.resolveAccessToken(request);

        if (accessToken != null) { // ACCESS TOKEN 존재
            if (tokenProvider.validateToken(accessToken)) { // ACCESS TOKEN 만료 시간 확인
                this.setAuthentication(accessToken);
            } else { // ACCESS TOKEN 만료
                String email = tokenProvider.getUserEmail(accessToken);
                Optional<Member> member = userRepository.findById(email);
                Optional<Token> refreshToken = redisRepository.findById("auth:" + email);

                refreshToken.orElse(tokenProvider.createRefreshToken(member.get()));

                boolean validateRefreshToken = tokenProvider.validateToken(refreshToken.get().getValue());

                if(validateRefreshToken) {
                    Token newAccessToken = tokenProvider.createAccessToken(member.get());
                    tokenProvider.setHeaderAccessToken(response, newAccessToken.getValue());
                    this.setAuthentication(newAccessToken.getValue());
                }
            }
        }
        filterChain.doFilter(request, response);

//        String accessToken = tokenProvider.resolveAccessToken(httpServletRequest);
//        String refreshToken = tokenProvider.resolveRefreshToken(httpServletRequest);
//
//        if(accessToken != null) {
//            if(tokenProvider.validateToken(accessToken)) {
//                this.setAuthentication(accessToken);
//            } else if(!tokenProvider.validateToken(accessToken) && refreshToken != null) {
//                boolean validateRefreshToken = tokenProvider.validateToken(refreshToken);
//                boolean isRefreshToken = tokenProvider.existRefreshToken(refreshToken);
//
//                if(validateRefreshToken && isRefreshToken) {
//                    String email = tokenProvider.getUserEmail(refreshToken);
//                    Optional<Member> member = userRepository.findById(email);
//
//                    Token newAccessToken = tokenProvider.createAccessToken(member.get());
//
//                    tokenProvider.setHeaderAccessToken(httpServletResponse, newAccessToken.getValue());
//
//                    this.setAuthentication(newAccessToken.getValue());
//                }
//            }
//        }
//        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    // SecurityContext에 Authentication 저장
    private void setAuthentication(String token) {
        log.info("setAuthentication");
        Authentication authentication = tokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}