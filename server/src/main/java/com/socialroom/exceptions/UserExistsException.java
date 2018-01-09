package com.socialroom.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User with that credentials already exists.")
public class UserExistsException extends RuntimeException {
}
