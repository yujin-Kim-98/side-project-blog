package com.blog.api.server.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
public class PostDTO {

    @ApiModelProperty(value = "POSTS")
    private Page<Post> posts;

    @ApiModelProperty(value = "ALL COUNT")
    private Long count;

    @ApiModelProperty(value = "NEXT PAGE")
    private boolean hasPrevious;


    @Builder
    public PostDTO(Page<Post> posts, Long count, boolean hasPrevious) {
        this.posts = posts;
        this.count = count;
        this.hasPrevious = hasPrevious;
    }
}
