package com.blog.api.server.config;

import com.blog.api.server.common.Role;
import com.blog.api.server.handler.CustomAccessDeniedHandler;
import com.blog.api.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .cors()
                .and()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반이므로 세션 사용 안함
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()


                    .antMatchers(HttpMethod.POST, "/api/post", "/api/file/s3-upload").hasAuthority(Role.MASTER.getRole())
                    .antMatchers(HttpMethod.PUT, "/api/post/{id}").hasAuthority(Role.MASTER.getRole())
                    .antMatchers(HttpMethod.DELETE, "/api/post/{id}").hasAuthority(Role.MASTER.getRole())
                    .anyRequest().permitAll();

        http.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler);
//                    .antMatchers(HttpMethod.POST, "/api/post").hasRole(Role.MASTER.getRole());


        // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣음
    }
}
