package com.blog.api.server.common;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiResponse;
import io.swagger.models.Response;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ResponseVO<T> {

    @ApiModelProperty(notes = "공통 Response", value = "코드")
    private HttpStatus status;

    @ApiModelProperty(notes = "공통 Response", value="메세지")
    private String message;

    @ApiModelProperty(notes = "성공 Response", value="json")
    private Object response;

    @ApiModelProperty(notes = "에러 Response", value = "에러코드(Custom)")
    private String code;


    /**
     * RESPONSE BUILDER
     */
    @Builder
    public ResponseVO(HttpStatus status, String message, String code, Object response) {
        this.status = status;
        this.message = message;
        this.code = code;
        this.response = response;
    }
}
