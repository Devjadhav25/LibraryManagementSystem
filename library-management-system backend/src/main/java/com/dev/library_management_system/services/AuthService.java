package com.dev.library_management_system.services;

import com.dev.library_management_system.payload.dto.UserDto;
import com.dev.library_management_system.payload.response.AuthResponse;
import com.dev.library_management_system.exception.UserException;

public interface AuthService {


    AuthResponse login (String username, String password) throws UserException;
    AuthResponse signup (UserDto req) throws UserException;

    void createPasswordResetToken (String email) throws UserException;
    void resetPassword (String token,  String password) throws Exception;




}
