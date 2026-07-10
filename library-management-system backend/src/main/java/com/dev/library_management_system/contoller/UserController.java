package com.dev.library_management_system.contoller;

import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.UserDto;
import com.dev.library_management_system.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("list")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return  ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("profile")
    public ResponseEntity<User> getUserProfile() {
        return  ResponseEntity.ok(userService.getCurrentUser());
    }
}
