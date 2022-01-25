package com.blog.api.server.service;

import com.blog.api.server.model.Member;
import com.blog.api.server.model.Post;
import com.blog.api.server.model.dto.PostDTO;
import org.springframework.data.domain.Pageable;

public interface PostService {
    String insertPost(PostDTO postDTO, Member member);

    PostDTO getPostAll(Pageable pageable);

    Post getPost(String id);

    void deletePost(String id);
}
