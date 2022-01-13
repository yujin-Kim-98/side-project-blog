package com.blog.api.server.handler;

import com.blog.api.server.common.ErrorCode;
import lombok.Getter;

import java.util.function.Supplier;

@Getter
public class CustomException extends RuntimeException {
    private ErrorCode error;

    public CustomException(ErrorCode e) {
        super(e.getMessage());
        this.error = e;
    }
}
