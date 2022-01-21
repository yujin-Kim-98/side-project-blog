package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "첨부파일")
public class File {

    @ApiModelProperty(required = true, value = "File NAME")
    private String fileName;

    @ApiModelProperty(required = true, value = "File URL")
    private String fileUrl;

    @ApiModelProperty(required = true, value = "POST ID")
    private String parentId;

    @ApiModelProperty(required = true, value = "FILE TYPE (EX : EDITOR, ATTACHMENT)")
    private String fileType;

    @ApiModelProperty(required = true, value = "FILE SORT NUMBER")
    private int sortNum;

    @ApiModelProperty(required = false, value = "CREATED")
    private LocalDateTime created;


    @Builder
    public File(String fileName, String fileUrl, String parentId, String fileType, int sortNum, LocalDateTime created) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.parentId = parentId;
        this.fileType = fileType;
        this.sortNum = sortNum;
        this.created = created;
    }
}
