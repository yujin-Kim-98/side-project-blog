package com.blog.api.server.controller;

import com.blog.api.server.common.ResponseVO;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.MemberDTO;
import com.blog.api.server.service.AuthService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Value("${jwt.response.header}")
    private String jwtHeader;

    @ApiOperation(value = "GET", notes = "로그인 유저 Loading")
    @GetMapping
    public ResponseEntity<ResponseVO> getAuth(HttpServletRequest request) {
        Member member = authService.getAuth(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(member)
                        .build());
    }

    @ApiOperation(value = "POST", notes = "JWT ACCESS TOKEN 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<ResponseVO> reissue(HttpServletRequest request, HttpServletResponse response) throws IOException {
        MemberDTO memberDTO = authService.reissue(request, response);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(memberDTO)
                        .build());
    }
}
