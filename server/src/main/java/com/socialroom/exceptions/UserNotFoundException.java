package com.socialroom.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Bed credentials! User with this email and password does not exists.")
public class UserNotFoundException extends RuntimeException {
}
