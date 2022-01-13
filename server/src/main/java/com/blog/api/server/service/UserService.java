package com.blog.api.server.service;

import com.blog.api.server.model.Member;
import com.blog.api.server.model.MemberDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletResponse;

public interface UserService extends UserDetailsService {
    void signup(Member memberDTO);

    MemberDTO signin(Member memberDTO, HttpServletResponse response);
}
