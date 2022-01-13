package com.blog.api.server.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {

    @ApiModelProperty(value = "JWT ACCESS TOKEN")
    private String accessToken;

    @ApiModelProperty(value = "Member Object")
    private Member member;

    @Builder
    public MemberDTO(String accessToken, Member member) {
        this.accessToken = accessToken;
        this.member = member;
    }
}
