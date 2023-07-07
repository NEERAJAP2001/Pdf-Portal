package com.portal.site.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.site.entities.Role;

public interface RoleRepo  extends JpaRepository<Role, Integer>{

}
