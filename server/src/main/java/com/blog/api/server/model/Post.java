package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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

//    @Transient
//    public static final String SEQUENCE_NAME = "post_sequence";

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
}
