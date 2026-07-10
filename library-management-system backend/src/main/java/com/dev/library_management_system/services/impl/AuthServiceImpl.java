package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.config.JwtProvider;
import com.dev.library_management_system.domain.UserRole;
import com.dev.library_management_system.exception.UserException;
import com.dev.library_management_system.mapper.UserMapper;
import com.dev.library_management_system.model.PasswordResetToken;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.UserDto;
import com.dev.library_management_system.payload.response.AuthResponse;
import com.dev.library_management_system.repository.PasswordResetTokenRepository;
import com.dev.library_management_system.repository.UserRepository;
import com.dev.library_management_system.services.AuthService;
import com.dev.library_management_system.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private final CustomUserServiceImplementation customUserServiceImplementation;

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    @Override
    public AuthResponse login(String username, String password) throws UserException {

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//        String role = authorities.iterator().next().getAuthority();
        String token = jwtProvider.generateToken(authentication);
        User user = userRepository.findByEmail(username);
        //update last login

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setTittle("Login Success");
        response.setMessage("Welcome Back"+ username);
        response.setJwt(token);
        response.setUser(UserMapper.toDto(user));
        return response;
    }


    private Authentication authenticate(String username, String password) throws UserException {
        UserDetails userDetails = customUserServiceImplementation.loadUserByUsername(username) ;

        if(userDetails == null) {
            throw new UserException("User not found with email-"+password);
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new UserException("Wrong password");
        }
        return new UsernamePasswordAuthenticationToken(username,  null, userDetails.getAuthorities());


    }

    @Override
    public AuthResponse signup(UserDto req) throws UserException {
        User user = userRepository.findByEmail(req.getEmail());

        if (user != null) {
            throw new UserException("email id already exists");

        }
        User createdUser = new User();
        createdUser.setEmail(req.getEmail());
        //might be error in importing class
        createdUser.setPassword(passwordEncoder.encode(req.getPassword()));
        createdUser.setPhone(req.getPhone());
        createdUser.setFullName(req.getFullName());
        createdUser.setLastLogin(LocalDateTime.now());
        //5.10.25 time
        createdUser.setRole(String.valueOf(UserRole.ROLE_USER));


        User savedUser = userRepository.save(createdUser);
        Authentication  auth  = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setTittle("Welcome"+savedUser.getFullName());
        authResponse.setMessage("Registered Successfully");
        authResponse.setUser(UserMapper.toDto(savedUser));

        return authResponse;
    }

    @Transactional
    public void createPasswordResetToken(String email) throws UserException {

        String frontendUrl ="http://localhost:5173" ;
        User user =  userRepository.findByEmail(email);
        if(user == null) {
            throw new UserException("user not found with given email");
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryAt(LocalDateTime.now().plusMinutes(5))
                .build();

        passwordResetTokenRepository.save(passwordResetToken);
        String resetLink = frontendUrl + "/reset-password?token=" + token;
        String subject = "Password Reset Request";
        String Body= "You requested to reset your password. Use this link (valid 5Minutes):"+resetLink;

        //sent email
        emailService.sendEmail(user.getEmail(),subject,Body);

    }

    @Transactional
    public void resetPassword(String token, String password) throws Exception {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(()-> new Exception ("token not valid"));


        if(resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new Exception ("token expired");
        }
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);

    }

}
