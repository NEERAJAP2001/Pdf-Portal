package com.portal.site.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portal.site.entities.OneTimePassword;





@Repository
public interface OtpDao extends JpaRepository<OneTimePassword, Long> {


    @Query(value = "select * from one_time_password where user_id =:id", nativeQuery = true)
    OneTimePassword getOtpByUserId(@Param("id") int id);

	@Query(value = "select * from one_time_password where user_id =:id", nativeQuery = true)
    OneTimePassword findByUserId(@Param("id") long id);
}
