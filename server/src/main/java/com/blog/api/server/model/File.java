package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document
@ApiModel(description = "첨부파일")
public class File {

    @Id
    @ApiModelProperty(required = false, value = "UUID")
    private String id;

    @ApiModelProperty(required = true, value = "Original File Name")
    private String originFileName;

    @ApiModelProperty(required = true, value = "File URL")
    private String fileUrl;

    @ApiModelProperty(required = true, value = "POST ID")
    private String parentId;

    @ApiModelProperty(required = false, value = "CREATED")
    private LocalDateTime created;


    @Builder
    public File(String id, String originFileName, String fileUrl, String parentId, LocalDateTime created) {
        this.id = id;
        this.originFileName = originFileName;
        this.fileUrl = fileUrl;
        this.parentId = parentId;
        this.created = created;
    }
}
