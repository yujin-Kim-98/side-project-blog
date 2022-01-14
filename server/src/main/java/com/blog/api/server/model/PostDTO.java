package com.blog.api.server.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostDTO {

    @ApiModelProperty(value = "POSTS")
    private List<Post> posts;

    @ApiModelProperty(value = "ALL COUNT")
    private Long count;

    @ApiModelProperty(value = "PAGING PAGE")
    private int page;

    @ApiModelProperty(value = "PAGING SIZE")
    private int size;

    @Builder
    public PostDTO(List<Post> posts, Long count, int page, int size) {
        this.posts = posts;
        this.count = count;
        this.page = page;
        this.size = size;
    }
}
