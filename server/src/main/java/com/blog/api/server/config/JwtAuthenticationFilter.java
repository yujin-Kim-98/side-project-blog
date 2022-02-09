package com.blog.api.server.config;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.ResponseVO;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    public JwtAuthenticationFilter(TokenProvider provider) {
        tokenProvider = provider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String path = request.getServletPath();

            if(path.startsWith("/api/auth/reissue")) {
                filterChain.doFilter(request, response);
            } else {
                String accessToken = tokenProvider.resolveAccessToken(request);
                boolean isTokenValid = tokenProvider.validateToken(accessToken, request);

                if (StringUtils.hasText(accessToken) && isTokenValid) {
                    this.setAuthentication(accessToken);
                }

                filterChain.doFilter(request, response);
            }

        } catch (ExpiredJwtException e) {
            ResponseVO responseVO = ResponseVO.builder()
                    .status(ErrorCode.JWT_ACCESS_TOKEN_EXPIRED.getStatus())
                    .message(ErrorCode.JWT_ACCESS_TOKEN_EXPIRED.getMessage())
                    .code(ErrorCode.JWT_ACCESS_TOKEN_EXPIRED.getCode())
                    .build();

            response.setStatus(ErrorCode.JWT_ACCESS_TOKEN_EXPIRED.getStatus().value());
            response.getWriter().write(new ObjectMapper().writeValueAsString(responseVO));
            response.getWriter().flush();
        }
    }

    // SecurityContext에 Authentication 저장
    private void setAuthentication(String token) {
        Authentication authentication = tokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}