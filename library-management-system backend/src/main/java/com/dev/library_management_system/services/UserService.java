package com.dev.library_management_system.services;


import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.UserDto;

import java.util.List;

public interface UserService {
    public User getCurrentUser();
    public List<UserDto> getAllUsers();
}
