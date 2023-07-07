package com.portal.site.services.impl;

import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.portal.site.entities.Post;
import com.portal.site.entities.User;
import com.portal.site.exceptions.ResourceNotFoundException;
import com.portal.site.payloads.PostDto;
import com.portal.site.payloads.PostResponse;
import com.portal.site.repositories.PostRepo;
import com.portal.site.repositories.UserRepo;
import com.portal.site.services.PostService;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;


    @Override
    public PostDto createPost(PostDto postDto, Integer userId) {

        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User ", "User id", userId));


        Post post = this.modelMapper.map(postDto, Post.class);
        post.setPdfName("default.png");
        post.setUser(user);


        Post newPost = this.postRepo.save(post);

        return this.modelMapper.map(newPost, PostDto.class);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Integer postId) {

        Post post = this.postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post ", "post id", postId));



        post.setTitle(postDto.getTitle());
        post.setPdfName(postDto.getPdfName());

        Post updatedPost = this.postRepo.save(post);
        return this.modelMapper.map(updatedPost, PostDto.class);
    }

    @Override
    public void deletePost(Integer postId) {

        Post post = this.postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post ", "post id", postId));

        this.postRepo.delete(post);

    }

    @Override
    public PostResponse  getAllPost() {
    	
    	List<Post> posts =  this.postRepo.findAll();
    	
        List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
                .collect(Collectors.toList());
        
        PostResponse postResponse = new PostResponse();

        postResponse.setContent(postDtos);
    
    	
    	return postResponse;

    }

    @Override
    public PostDto getPostById(Integer postId) {
        Post post = this.postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "post id", postId));
        return this.modelMapper.map(post, PostDto.class);
    }



    @Override
    public List<PostDto> getPostsByUser(Integer userId) {

        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User ", "userId ", userId));
        List<Post> posts = this.postRepo.findByUser(user);

        List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
                .collect(Collectors.toList());

        return postDtos;
    }

    @Override
    public PostResponse searchPosts(String keyword) {
        List<Post> posts = this.postRepo.searchByTitle("%" + keyword + "%");
        List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
        
        
        PostResponse postResponse = new PostResponse();

        postResponse.setContent(postDtos);
    
    	
    	return postResponse;
    }
}
