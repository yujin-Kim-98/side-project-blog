package com.blog.api.server.handler;

import com.blog.api.server.common.ResponseVO;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler({CustomException.class})
    public ResponseEntity<ResponseVO> customExceptionHandler(HttpServletRequest request, CustomException e) {
        return ResponseEntity
                .status(e.getError().getStatus())
                .body(
                        ResponseVO.builder()
                                .status(e.getError().getStatus())
                                .message(e.getError().getMessage())
                                .code(e.getError().getCode())
                                .build()
                );
    }
}
