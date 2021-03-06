package com.socialroom.repositories;

import com.socialroom.entities.chat.Chat;
import com.socialroom.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByUsername(String username);

    User findOneByUsernameOrEmail(String username, String email);

}
