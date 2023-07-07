package com.portal.site.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.site.entities.Comment;

public interface CommentRepo  extends JpaRepository<Comment	, Integer> {

}
