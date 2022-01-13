package com.blog.api.server.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.time.LocalDateTime;

@Getter
@Setter
@RedisHash("auth")
public class Token {

    @Id
    private String key;
    private String value;
    @TimeToLive
    private Long expiredTime;

    @Builder
    public Token(String key, String value, Long expiredTime) {
        this.key = key;
        this.value = value;
        this.expiredTime = expiredTime;
    }
}
