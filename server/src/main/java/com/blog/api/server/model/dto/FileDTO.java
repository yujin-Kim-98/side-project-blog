package com.blog.api.server.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FileDTO {

    private String originFileName;

    private String fileUrl;

    @Builder
    public FileDTO(String originFileName, String fileUrl) {
        this.originFileName = originFileName;
        this.fileUrl = fileUrl;
    }
}
