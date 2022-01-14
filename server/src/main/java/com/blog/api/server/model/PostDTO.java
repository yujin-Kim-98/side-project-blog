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

    @ApiModelProperty(value = "NEXT PAGE")
    private boolean hasNext;

    @ApiModelProperty(value = "PAGING PAGE")
    private int page;

    @ApiModelProperty(value = "PAGING SIZE")
    private int size;

    @Builder
    public PostDTO(List<Post> posts, Long count, boolean hasNext, int page, int size) {
        this.posts = posts;
        this.count = count;
        this.hasNext = hasNext;
        this.page = page;
        this.size = size;
    }
}
