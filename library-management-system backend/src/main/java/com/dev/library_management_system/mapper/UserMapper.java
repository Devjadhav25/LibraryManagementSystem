package com.dev.library_management_system.mapper;

import com.dev.library_management_system.domain.UserRole;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.UserDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserMapper  {
    public static UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setPhone(user.getPhone());
        userDto.setLastLogin(user.getLastLogin());
        userDto.setRole(UserRole.valueOf(user.getRole()));

        return userDto;
    }

    public static List<UserDto> toDtoList(List<User> users) {
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

    public static Set<UserDto> toDtoSet(Set<User> users) {
        return users.stream().map(UserMapper::toDto).collect(Collectors.toSet());

    }

    public static User  toEntity(UserDto userDto) {
        User createdUser = new User();
        createdUser.setEmail(userDto.getEmail());
        createdUser.setPassword(userDto.getPassword());
        createdUser.setFullName(userDto.getFullName());
        createdUser.setPhone(userDto.getPhone());
        createdUser.setRole(userDto.getRole().toString());
        createdUser.setCreatedAt(LocalDateTime.now());

        return createdUser;
    }



}
