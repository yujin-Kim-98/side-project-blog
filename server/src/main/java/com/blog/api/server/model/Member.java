package com.blog.api.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
@Document
@ApiModel(description = "유저")
public class Member implements UserDetails {

    @Id
    @ApiModelProperty(required = true, value = "이메일")
    private String email;

    @ApiModelProperty(required = true, value = "이름")
    private String name;

    @ApiModelProperty(required = true, value = "패스워드")
    private String password;

    @ApiModelProperty(required = false, value = "권한(Master, Sub)")
    private String role;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
