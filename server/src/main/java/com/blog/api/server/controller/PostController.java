package com.blog.api.server.controller;

import com.blog.api.server.common.ResponseVO;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.Post;
import com.blog.api.server.model.PostDTO;
import com.blog.api.server.service.PostService;
import io.swagger.annotations.ApiModelProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostService postService;

    @ApiModelProperty(value = "GET", notes = "메인 화면 게시물 리스트")
    @GetMapping
    public ResponseEntity<ResponseVO> getPostAll(@PageableDefault(size = 5, sort = "created", direction = Sort.Direction.DESC) Pageable pageable) {
        PostDTO postDTO = postService.getPostAll(pageable);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(postDTO)
                        .build());
    }

    @ApiModelProperty(value = "POST", notes = "게시글 등록")
    @PostMapping
    public ResponseEntity<ResponseVO> insertPost(@RequestBody Post post, @AuthenticationPrincipal Member member) {
        post.setCreator(member.getEmail());

        String id = postService.insertPost(post);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(id)
                        .build());
    }

    @ApiModelProperty(value = "GET", notes = "게시글 상세")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseVO> getPost(@PathVariable String id) {
        Post post = postService.getPost(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseVO.builder()
                        .status(HttpStatus.OK)
                        .response(post)
                        .build());
    }
}
