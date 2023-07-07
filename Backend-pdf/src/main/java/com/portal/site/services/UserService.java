package com.portal.site.services;

import java.util.List;


import com.portal.site.payloads.UserDto;

import javax.mail.MessagingException;


public interface UserService {

	UserDto registerNewUser(UserDto userDto);
	
	
	UserDto createUser(UserDto user);

	UserDto updateUser(UserDto user, Integer userId);

	UserDto getUserById(Integer userId);

	List<UserDto> getAllUsers();

	void deleteUser(Integer userId);

	UserDto registerNewAdmin(UserDto userDto); 
    String forgotPassword(String email) throws MessagingException;
    String setPassword(String email, String newPassword);

    String verifyOtp(String email, String otp);
}
