package com.blog.api.server.common;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    // Member
    NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST,"MEMBER-0001", "Member not found"),
    EXISTING_MEMBER(HttpStatus.BAD_REQUEST, "MEMBER-0002", "Member that already exists");

    HttpStatus status;
    String code;
    String message;

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
