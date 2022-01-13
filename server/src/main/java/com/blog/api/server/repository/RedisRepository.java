package com.blog.api.server.repository;

import com.blog.api.server.model.Token;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRepository extends CrudRepository<Token, String> {
}
