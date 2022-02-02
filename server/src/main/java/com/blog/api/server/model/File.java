package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "첨부파일")
public class File {

    @ApiModelProperty(required = true, value = "파일 이름")
    private String fileName;

    @ApiModelProperty(required = true, value = "파일 URL")
    private String fileUrl;

    @ApiModelProperty(required = true, value = "파일 순번")
    private int sort;

    @Builder
    public File(String fileName, String fileUrl, int sort) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.sort = sort;
    }
}
