package com.blog.api.server.service;

import com.blog.api.server.model.Member;

public interface AuthService {
    Member getAuth(String accessToken);
}
