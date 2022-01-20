package com.blog.api.server.service;

import com.blog.api.server.model.dto.FileDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    FileDTO s3Upload(MultipartFile file);

    void insertFile(String parentId, List<FileDTO> addFile);
}
