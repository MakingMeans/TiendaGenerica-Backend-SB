package com.tienda.authenticationservice.repository;

import com.tienda.authenticationservice.entity.UserRole;
import com.tienda.authenticationservice.entity.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
}
