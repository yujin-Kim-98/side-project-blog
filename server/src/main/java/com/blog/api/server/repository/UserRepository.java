package com.blog.api.server.repository;

import com.blog.api.server.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Member, String> {
}
