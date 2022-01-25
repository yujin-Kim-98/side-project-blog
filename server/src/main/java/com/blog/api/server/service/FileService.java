package com.blog.api.server.service;

import com.blog.api.server.model.File;
import com.blog.api.server.model.dto.FileDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    File s3Upload(FileDTO fileDTO);

    void deleteFile(String newFileName);
}
