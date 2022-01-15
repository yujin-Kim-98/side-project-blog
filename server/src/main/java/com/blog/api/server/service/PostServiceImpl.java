package com.blog.api.server.service;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.Post;
import com.blog.api.server.model.PostDTO;
import com.blog.api.server.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    TokenProvider tokenProvider;

    @Override
    public String insertPost(Post post) {
        String id = UUID.randomUUID().toString();

        post.setId(id);
        post.setCreated(LocalDateTime.now());

        postRepository.insert(post);

        return id;
    }

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
}
