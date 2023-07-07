package com.portal.site.repositories;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.site.entities.User;

public interface UserRepo extends JpaRepository<User, Integer>{
		
	
	Optional<User> findByEmail(String email);
	
	
    @Query(value = "select * from users where email =:userEmail", nativeQuery = true)
    User findByUserEmail(@Param("userEmail") String userEmail);
}
