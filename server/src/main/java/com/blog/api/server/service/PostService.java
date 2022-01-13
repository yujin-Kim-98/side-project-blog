package com.blog.api.server.service;

import com.blog.api.server.model.Post;
import com.blog.api.server.model.PostDTO;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

public interface PostService {
    String insertPost(Post post);

    PostDTO getPostAll(Pageable pageable);
}
