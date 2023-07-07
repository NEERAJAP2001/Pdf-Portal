package com.portal.site.payloads;

import java.util.Date;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.portal.site.entities.Comment;
import com.portal.site.entities.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDto {

	private Integer postId;
	
	private String title;

	
	private String pdfName;
	

	private UserDto user;
	
	private Set<CommentDto> comments=new HashSet<>();

	
	
	
	
	
	
}
