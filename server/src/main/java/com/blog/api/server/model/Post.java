package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

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

    @ApiModelProperty(required = false, value = "수정자")
    private String updator;

    @ApiModelProperty(required = false, value = "수정시간")
    private LocalDateTime updated;

    @ApiModelProperty(required = false, value = "썸네일 URL")
    private String thumbnailUrl;

    @ApiModelProperty(required = false, value = "파일 리스트")
    private List<File> fileList;

    @Builder
    public Post(String id, String title, String content, String creator, LocalDateTime created, String updator, LocalDateTime updated, String thumbnailUrl, List<File> fileList) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creator = creator;
        this.created = created;
        this.updator = updator;
        this.updated = updated;
        this.thumbnailUrl = thumbnailUrl;
        this.fileList = fileList;
    }
}
