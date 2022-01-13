package com.blog.api.server.controller;

import com.blog.api.server.common.ResponseVO;
import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.MemberDTO;
import com.blog.api.server.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @ApiOperation(value = "POST", notes = "로그인 API")
    @PostMapping("/signin")
    public ResponseEntity<ResponseVO> signin(@RequestBody Member memberDTO, HttpServletResponse response) {
        MemberDTO member = userService.signin(memberDTO, response);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(member)
                        .build());
    }

    @ApiOperation(value = "POST", notes = "회원가입 API")
    @PostMapping("/signup")
    public ResponseEntity<ResponseVO> signup(@RequestBody Member memberDTO) {
        userService.signup(memberDTO);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .build());
    }
}
