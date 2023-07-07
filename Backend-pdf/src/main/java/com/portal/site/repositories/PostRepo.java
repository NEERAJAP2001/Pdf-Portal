package com.portal.site.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.site.entities.Post;
import com.portal.site.entities.User;

public interface PostRepo extends JpaRepository<Post, Integer> {

	List<Post> findByUser(User user);
	
	
	@Query("select p from Post p where p.title like :key")
	List<Post> searchByTitle(@Param("key") String title);
	

}
