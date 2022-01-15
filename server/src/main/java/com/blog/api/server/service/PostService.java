package com.blog.api.server.service;

import com.blog.api.server.model.Post;
import com.blog.api.server.model.PostDTO;
import org.springframework.data.domain.Pageable;

public interface PostService {
    String insertPost(Post post);

    PostDTO getPostAll(Pageable pageable);

    Post getPost(String id);
}
