package com.portal.site.services.impl;

import java.time.LocalDateTime;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.portal.site.config.AppConstants;
import com.portal.site.emailconfiguration.EmailUtil;
import com.portal.site.entities.OneTimePassword;
import com.portal.site.entities.Role;
import com.portal.site.entities.User;
import com.portal.site.exceptions.ResourceNotFoundException;
import com.portal.site.payloads.UserDto;
import com.portal.site.repositories.OtpDao;
import com.portal.site.repositories.RoleRepo;
import com.portal.site.repositories.UserRepo;
import com.portal.site.services.UserService;

import javax.mail.MessagingException;

@Service
public class UserServiceImpl implements UserService {

	
	@Autowired 
	private OtpDao otpdao;
	
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepo roleRepo;
	
    @Autowired
    private EmailUtil emailUtil;

	@Override
	public UserDto createUser(UserDto userDto) {
		User user = this.dtoToUser(userDto);
		User savedUser = this.userRepo.save(user);
		return this.userToDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));

		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());

		User updatedUser = this.userRepo.save(user);
		UserDto userDto1 = this.userToDto(updatedUser);
		return userDto1;
	}

	@Override
	public UserDto getUserById(Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));

		return this.userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {

		List<User> users = this.userRepo.findAll();
		List<UserDto> userDtos = users.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());

		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		this.userRepo.delete(user);

	}

	public User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);

		// user.setId(userDto.getId());
		// user.setName(userDto.getName());
		// user.setEmail(userDto.getEmail());
		// user.setAbout(userDto.getAbout());
		// user.setPassword(userDto.getPassword());
		return user;
	}

	public UserDto userToDto(User user) {
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		return userDto;
	}


	
	@Override
    public String forgotPassword(String email) throws MessagingException {
        User users = this.userRepo.findByUserEmail(email);
        if (users == null) {
            throw new RuntimeException("Invalid email");
        }

        OneTimePassword otp = this.otpdao.findByUserId(users.getId());
        boolean isNewOTP = false;

        if (otp == null) {
            otp = new OneTimePassword();
            otp.setUser(users);
            isNewOTP = true;
        }

        otp.setOtpValue(generateOtp());
        otp.setExpirationTime(LocalDateTime.now().plusMinutes(10));

        this.otpdao.save(otp);

        emailUtil.sendSetPasswordViaEmail(email, otp.getOtpValue());

        if (isNewOTP) {
            return "OTP has been sent to your email address.";
        } else {
            return "OTP has been resent to your email address.";
        }
    }


    private String generateOtp() {

        int otpValue = (int) (Math.random() * (999999-100000+1) +100000); // Generate a random 6-digit OTP
        return String.valueOf(otpValue);
        }



    @Override
    public String verifyOtp(String email, String otp) {

        User users = this.userRepo.findByUserEmail(email);
        OneTimePassword oTp = this.otpdao.getOtpByUserId(users.getId());

        LocalDateTime currentDate = LocalDateTime.now();

        if(otp.equals(oTp.getOtpValue()) && oTp.getExpirationTime().isAfter(currentDate)){

            return "otp has been successfully verified.";
            
        }
        return "Incorrect password or time has expired";
    }

 // setting the users new Password

    @Override
    public String setPassword(String email, String newPassword) {
    	

            User users = this.userRepo.findByUserEmail(email);

            users.setPassword(this.passwordEncoder.encode(newPassword));
            this.userRepo.save(users);
            return "Password has been changed successfully";
    	

    }

	@Override
	public UserDto registerNewAdmin(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);

		// encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		// roles
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();

		user.getRoles().add(role);

		User newUser = this.userRepo.save(user);

		return this.modelMapper.map(newUser, UserDto.class);
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);

		// encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));

		// roles
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();

		user.getRoles().add(role);

		User newUser = this.userRepo.save(user);

		return this.modelMapper.map(newUser, UserDto.class);
	}



}
