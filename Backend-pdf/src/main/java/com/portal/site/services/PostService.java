package com.portal.site.services;

import java.util.List;

import com.portal.site.entities.Post;
import com.portal.site.payloads.PostDto;
import com.portal.site.payloads.PostResponse;

public interface PostService {

	//create 

	PostDto createPost(PostDto postDto,Integer userId);

	//update 

	PostDto updatePost(PostDto postDto, Integer postId);

	// delete

	void deletePost(Integer postId);
	
	//get all posts
	
	PostResponse getAllPost();
	
	//get single post
	
	PostDto getPostById(Integer postId);
	

	

	
	//get all posts by user
	List<PostDto> getPostsByUser(Integer userId);
	
	//search posts
	PostResponse searchPosts(String keyword);

}
