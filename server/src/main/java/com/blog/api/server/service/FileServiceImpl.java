package com.blog.api.server.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.File;
import com.blog.api.server.model.dto.FileDTO;
import com.blog.api.server.repository.FileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    FileRepository fileRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3Client amazonS3Client;


    @Override
    public File s3Upload(FileDTO fileDTO) {
        MultipartFile multipartFile = fileDTO.getFile();

        String originFileName = multipartFile.getOriginalFilename();
        String newFileName = UUID.randomUUID() + "_" + originFileName;

        try(InputStream inputStream = multipartFile.getInputStream()) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());
            metadata.setContentLength(multipartFile.getSize());

            amazonS3Client.putObject(new PutObjectRequest(bucket, newFileName, inputStream, metadata));
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new CustomException(ErrorCode.AWS_S3_UPLOAD_FAIL);
        }

        File file = File.builder()
                .fileName(originFileName)
                .newFileName(newFileName)
                .fileUrl(amazonS3Client.getUrl(bucket, newFileName).toString())
                .fileType(fileDTO.getFileType())
                .build();

        return file;
    }

    @Override
    public void deleteFile(String newFileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, newFileName));
    }
}
