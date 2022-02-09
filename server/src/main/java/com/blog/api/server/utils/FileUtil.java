package com.blog.api.server.utils;

import com.blog.api.server.model.File;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class FileUtil {

    private static final String imgUrlPattern = "<img[^>]*src=[\\\"']?([^>\\\"']+)[\\\"']?[^>]*>";

    private static final Tika tika = new Tika();


    public static String getThumbnailUrl(String content) {
        Pattern pattern = Pattern.compile(imgUrlPattern);
        Matcher match = pattern.matcher(content);

        return match.find() ? match.group(1) : null;
    }

    public static List<File> getFileList(String content) {
        Pattern pattern = Pattern.compile(imgUrlPattern);
        Matcher match = pattern.matcher(content);

        List<File> fileList = new ArrayList<>();

        int sort = 1;

        while(match.find()) {
            String fileUrl = match.group(1);
            String fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length());

            File file = File.builder()
                    .fileName(fileName)
                    .fileUrl(fileUrl)
                    .sort(sort)
                    .build();

            sort++;

            fileList.add(file);
        }
        return fileList;
    }

    public static boolean editorFileValid(MultipartFile file, String white) {
        try(InputStream inputStream = file.getInputStream()) {
            String mimeType = tika.detect(inputStream);

            List<String> whiteImageList = Arrays.asList(white.split(","));

            return whiteImageList.stream().anyMatch(whiteType -> whiteType.equalsIgnoreCase(mimeType));
        } catch (IOException e) {
            log.error(e.getMessage());
            return false;
        }
    }
}
