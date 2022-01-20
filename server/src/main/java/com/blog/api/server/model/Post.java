package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document
@ApiModel(description = "포스트")
public class Post {

    @Id
    @ApiModelProperty(required = true, value = "UUID")
    private String id;

    @ApiModelProperty(required = true, value = "제목")
    private String title;

    @ApiModelProperty(required = true, value = "내용")
    private String content;

    @ApiModelProperty(required = true, value = "작성자")
    private String creator;

    @ApiModelProperty(required = true, value = "작성시간")
    private LocalDateTime created;

    @Builder
    public Post(String id, String title, String content, String creator, LocalDateTime created) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creator = creator;
        this.created = created;
    }
}
