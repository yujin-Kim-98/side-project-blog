package com.blog.api.server.service;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.Role;
import com.blog.api.server.common.TimeZone;
import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.Post;
import com.blog.api.server.model.dto.PostDTO;
import com.blog.api.server.repository.PostRepository;
import com.blog.api.server.utils.FileUtil;
import com.blog.api.server.utils.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    FileService fileService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    TokenProvider tokenProvider;


    @Override
    public String insertPost(PostDTO postDTO, Member member) {
        if(member == null || member.getRole().equalsIgnoreCase(Role.MASTER.getRole())) {
            new CustomException(ErrorCode.NOT_HAVE_PERMISSION);
        }

        String id = UUID.randomUUID().toString();

        Post post = Post.builder()
                .id(id)
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .creator(member.getEmail())
                .created(TimeUtil.getLocalDateTime(TimeZone.ASIA_SEOUL.getZone()))
                .thumbnailUrl(FileUtil.getThumbnailUrl(postDTO.getContent()))
                .fileList(FileUtil.getFileList(postDTO.getContent()))
                .build();

        postRepository.insert(post);

        return id;
    };

    @Override
    public PostDTO getPostAll(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);

        return PostDTO.builder()
                .posts(posts.getContent())
                .count(posts.getTotalElements())
                .page(posts.getPageable().getPageNumber())
                .size(posts.getSize())
                .build();
    }

    @Override
    public Post getPost(String id) {
        Optional<Post> post = postRepository.findById(id);

        post.orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POST)
        );

        return post.get();
    }

    @Override
    public void deletePost(String id) {
        Optional<Post> post = postRepository.findById(id);

        post.orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POST)
        );

        postRepository.deleteById(id);

        post.get().getFileList().forEach(
                file -> {
                    fileService.deleteFile(file.getFileName());
                }
        );
    }

    @Override
    public void updatePost(PostDTO postDTO, Member member) {
        Optional<Post> post = postRepository.findById(postDTO.getId());

        post.orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_POST)
        );

        Post updatePost = Post.builder()
                .id(postDTO.getId())
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .thumbnailUrl(FileUtil.getThumbnailUrl(postDTO.getContent()))
                .creator(post.get().getCreator())
                .created(post.get().getCreated())
                .updator(member.getEmail())
                .updated(TimeUtil.getLocalDateTime(TimeZone.ASIA_SEOUL.getZone()))
                .fileList(FileUtil.getFileList(postDTO.getContent()))
                .build();

        postRepository.save(updatePost);
    }
}
