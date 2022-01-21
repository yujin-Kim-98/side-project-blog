package com.blog.api.server.model.dto;

import com.blog.api.server.model.File;
import com.blog.api.server.model.Post;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostDTO {

    @ApiModelProperty(value = "POST TITLE")
    private String title;

    @ApiModelProperty(value = "POST CONTENT")
    private String content;

    @ApiModelProperty(value = "ADD FILE LIST")
    private List<File> addFile;

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
