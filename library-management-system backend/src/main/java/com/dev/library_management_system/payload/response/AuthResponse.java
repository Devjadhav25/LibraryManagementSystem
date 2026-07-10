package com.dev.library_management_system.payload.response;


import com.dev.library_management_system.payload.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String jwt;

    private String message;
    private String tittle;
    private UserDto user;
}
