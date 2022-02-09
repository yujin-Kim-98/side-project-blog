package com.blog.api.server.service;

import com.blog.api.server.model.Member;
import com.blog.api.server.model.MemberDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface AuthService {
    Member getAuth(HttpServletRequest request);

    MemberDTO reissue(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
