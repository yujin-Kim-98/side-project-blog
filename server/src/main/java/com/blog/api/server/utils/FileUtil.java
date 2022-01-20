package com.blog.api.server.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Slf4j
public class FileUtil {

    public static File convertFile(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());
        try(FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        } catch(IOException e) {
            log.error(e.getMessage());
            // Custom Exception
        }
        return file;
    }
}
