package com.blog.api.server.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.Role;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.File;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.dto.FileDTO;
import com.blog.api.server.repository.FileRepository;
import com.blog.api.server.utils.FileUtil;
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

    @Autowired
    private AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.cloudfront.domain}")
    private String cloudFrontDomain;

    @Value("${editor.file.upload.mimetype.white}")
    private String imgWhite;


    @Override
    public File s3Upload(FileDTO fileDTO, Member member) {
        MultipartFile multipartFile = fileDTO.getFile();

        if(!multipartFile.isEmpty()) {

            try(InputStream inputStream = multipartFile.getInputStream()) {
                boolean isValid = FileUtil.editorFileValid(multipartFile, imgWhite);

                if(!isValid) {
                    throw new CustomException(ErrorCode.AWS_S3_UPLOAD_VALID);
                }

                String originFileName = multipartFile.getOriginalFilename();
                String newFileName = UUID.randomUUID() + "_" + originFileName;


                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(multipartFile.getContentType());
                metadata.setContentLength(multipartFile.getSize());

                amazonS3Client.putObject(new PutObjectRequest(bucket, newFileName, inputStream, metadata));

                File file = File.builder()
                        .fileUrl(cloudFrontDomain + newFileName)
                        .build();

                return file;
            } catch (IOException e) {
                log.error(e.getMessage());
                throw new CustomException(ErrorCode.AWS_S3_UPLOAD_FAIL);
            }
        } else {
            throw new CustomException(ErrorCode.AWS_S3_UPLOAD_VALID);
        }
    }

    @Override
    public void deleteFile(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }
}
