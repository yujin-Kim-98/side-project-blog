package com.blog.api.server.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.TimeZone;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.File;
import com.blog.api.server.model.dto.FileDTO;
import com.blog.api.server.repository.FileRepository;
import com.blog.api.server.utils.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
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
    public FileDTO s3Upload(MultipartFile file) {
        String originFileName = file.getOriginalFilename();
        String newFileName = UUID.randomUUID() + "_" + originFileName;

        try(InputStream inputStream = file.getInputStream()) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            amazonS3Client.putObject(new PutObjectRequest(bucket, newFileName, inputStream, metadata));
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new CustomException(ErrorCode.AWS_S3_UPLOAD_FAIL);
        }

        FileDTO fileDTO = FileDTO.builder()
                .originFileName(originFileName)
                .fileUrl(amazonS3Client.getUrl(bucket, newFileName).toString())
                .build();

        return fileDTO;
    }

    @Override
    public void insertFile(String parentId, List<FileDTO> addFile) {
        addFile.forEach(
                fileDTO -> {
                    File file = File.builder()
                            .id(UUID.randomUUID().toString())
                            .originFileName(fileDTO.getOriginFileName())
                            .fileUrl(fileDTO.getFileUrl())
                            .parentId(parentId)
                            .created(TimeUtil.getLocalDateTime(TimeZone.ASIA_SEOUL.getZone()))
                            .build();

                    fileRepository.insert(file);
                }
        );
    }
}
