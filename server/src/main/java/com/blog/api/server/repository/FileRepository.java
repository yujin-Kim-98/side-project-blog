package com.blog.api.server.repository;

import com.blog.api.server.model.File;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<File, String> {
}
