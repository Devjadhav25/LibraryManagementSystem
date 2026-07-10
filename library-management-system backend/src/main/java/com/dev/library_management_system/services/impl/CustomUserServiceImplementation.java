package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.model.User;
import com.dev.library_management_system.repository.UserRepository;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
public class CustomUserServiceImplementation implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not exist with username"+username);
        }
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole().toString());

        Collection<? extends GrantedAuthority> authorities = Collections.singletonList(grantedAuthority);

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
