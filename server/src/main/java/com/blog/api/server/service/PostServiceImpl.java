package com.blog.api.server.service;

import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.model.Post;
import com.blog.api.server.model.PostDTO;
import com.blog.api.server.repository.PostRepository;
import com.blog.api.server.utils.MongoUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
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
        Long count = postRepository.count();
        Page<Post> posts = postRepository.findAll(pageable);
        boolean hasPrevious = pageable.hasPrevious();

        return PostDTO.builder()
                .posts(posts)
                .count(count)
                .hasPrevious(hasPrevious)
                .build();
    }
}
