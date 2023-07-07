package com.portal.site.controllers;


import java.io.IOException;


import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portal.site.payloads.ApiResponse;
import com.portal.site.payloads.PostDto;
import com.portal.site.payloads.PostResponse;
import com.portal.site.services.FileService;
import com.portal.site.services.PostService;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/api/v1/")
public class PostController {

	@Autowired
	private PostService postService;

	@Autowired
	private FileService fileService;

	@Value("${project.image}")
	private String path;
//	create

	@PostMapping("/user/{userId}/posts")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto, @PathVariable Integer userId) {
		PostDto createPost = this.postService.createPost(postDto, userId);
		return new ResponseEntity<PostDto>(createPost, HttpStatus.CREATED);
	}

	
	
	// get by user

	@GetMapping("/user/{userId}/posts")
	public ResponseEntity<List<PostDto>> getPostsByUser(@PathVariable Integer userId) {

		List<PostDto> posts = this.postService.getPostsByUser(userId);
		return new ResponseEntity<List<PostDto>>(posts, HttpStatus.OK);

	}




	// get all posts

	@GetMapping("/posts")
	public  ResponseEntity<PostResponse> getAllPost() {
		
		PostResponse postResponse = this.postService.getAllPost();
		return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
		
//		
//
//		List<PostDto> postResponse = this.postService.getAllPost();
//		
//		//return postResponse;
//		return new ResponseEntity<List<PostDto>>(postResponse, HttpStatus.OK);
	}

	// get post details by id

	@GetMapping("/posts/{postId}")
	public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId) {

		PostDto postDto = this.postService.getPostById(postId);
		return new ResponseEntity<PostDto>(postDto, HttpStatus.OK);

	}

	// delete post
	@DeleteMapping("/posts/{postId}")
	public ApiResponse deletePost(@PathVariable Integer postId) {
		this.postService.deletePost(postId);
		return new ApiResponse("Post is successfully deleted !!", true);
	}

	// update post

	@PutMapping("/posts/{postId}")
	public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto, @PathVariable Integer postId) {

		PostDto updatePost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updatePost, HttpStatus.OK);

	}

	// search
	@GetMapping("/posts/search/{keywords}")
	public ResponseEntity<PostResponse> searchPostByTitle(@PathVariable("keywords") String keywords) {
		PostResponse result = this.postService.searchPosts(keywords);
		return new ResponseEntity<PostResponse>(result, HttpStatus.OK);
	}

	// post pdf upload

	@PostMapping("/post/pdf/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostPdf(@RequestParam("pdf") MultipartFile pdf,
			@PathVariable Integer postId) throws IOException {

		PostDto postDto = this.postService.getPostById(postId);
		
		String fileName = this.fileService.uploadPdf(path, pdf);
		postDto.setPdfName(fileName);
		PostDto updatePost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updatePost, HttpStatus.OK);

	}
	
	
    @GetMapping("/post/pdf/{pdfName}")
    public ResponseEntity<Resource> downloadPDF(@PathVariable String pdfName) throws IOException {

        InputStream resource = this.fileService.getResource(path, pdfName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);

        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(resource));
    }
}
