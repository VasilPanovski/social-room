package com.socialroom.repositories;

import com.socialroom.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByUsername(String username);

    User findOneByUsernameOrEmail(String username, String email);
}
