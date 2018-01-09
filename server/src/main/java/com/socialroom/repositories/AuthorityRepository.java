package com.socialroom.repositories;

import com.socialroom.entities.user.Authority;
import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepository extends CrudRepository<Authority, Long> {

    Authority findOneByAuthority(String authority);
}