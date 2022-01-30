package com.blog.api.server.controller;

import com.blog.api.server.common.ResponseVO;
import com.blog.api.server.model.File;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.dto.FileDTO;
import com.blog.api.server.service.FileService;
import io.swagger.annotations.ApiModelProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    FileService fileService;

    @ApiModelProperty(value = "POST", notes = "S3 UPLOAD (SERVER)")
    @PostMapping("/s3-upload")
    public ResponseEntity<ResponseVO> s3Upload(@ModelAttribute FileDTO fileDTO, @AuthenticationPrincipal Member member) {
        File file = fileService.s3Upload(fileDTO, member);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(file)
//                        .response(null)
                        .build());
    }
}
