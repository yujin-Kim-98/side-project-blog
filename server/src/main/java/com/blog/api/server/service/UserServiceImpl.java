package com.blog.api.server.service;

import com.blog.api.server.common.ErrorCode;
import com.blog.api.server.common.Role;
import com.blog.api.server.config.TokenProvider;
import com.blog.api.server.handler.CustomException;
import com.blog.api.server.model.Member;
import com.blog.api.server.model.MemberDTO;
import com.blog.api.server.model.Token;
import com.blog.api.server.repository.RedisRepository;
import com.blog.api.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    RedisRepository redisRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> member = userRepository.findById(email);
        member.orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MEMBER)
        );
        return member.get();
    }

    @Override
    public MemberDTO signin(Member memberDTO, HttpServletResponse response) {
        Optional<Member> member = userRepository.findById(memberDTO.getEmail());

        member.orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MEMBER)
        );

        if(!passwordEncoder.matches(memberDTO.getPassword(), member.get().getPassword())) {
            throw new CustomException(ErrorCode.NOT_FOUND_MEMBER);
        }

        Token accessToken = tokenProvider.createAccessToken(member.get());
        Token refreshToken = tokenProvider.createRefreshToken(member.get());

        tokenProvider.setHeaderAccessToken(response, accessToken.getValue());

        redisRepository.save(refreshToken);

        return MemberDTO.builder()
                .accessToken(accessToken.getValue())
                .member(member.get())
                .build();
    }

    @Override
    public void signup(Member memberDTO) {
        Optional<Member> member = userRepository.findById(memberDTO.getEmail());

        member.ifPresent(
                action -> {throw new CustomException(ErrorCode.EXISTING_MEMBER);}
        );

        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        memberDTO.setRole(Role.SUB.getRole());

        userRepository.insert(memberDTO);
    }
}
