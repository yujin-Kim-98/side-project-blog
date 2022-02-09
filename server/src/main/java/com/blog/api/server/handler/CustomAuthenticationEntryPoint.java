package com.blog.api.server.handler;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.ResponseVO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        String exception = (String) httpServletRequest.getAttribute("exception");

        ResponseVO responseVO = ResponseVO.builder()
                .status(HttpStatus.UNAUTHORIZED)
                .message("Unauthorized")
                .code(ErrorCode.UNAUTHORIZED.getCode())
                .build();

        String result = objectMapper.writeValueAsString(responseVO);

        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);;
        httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        httpServletResponse.getWriter().write(result);
        httpServletResponse.getWriter().flush();
    }
}
