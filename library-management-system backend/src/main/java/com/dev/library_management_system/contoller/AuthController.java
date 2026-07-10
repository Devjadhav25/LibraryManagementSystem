package com.dev.library_management_system.contoller;

import com.dev.library_management_system.exception.UserException;
import com.dev.library_management_system.payload.dto.UserDto;
import com.dev.library_management_system.payload.request.ForgotPasswordRequest;
import com.dev.library_management_system.payload.request.LoginRequest;
import com.dev.library_management_system.payload.request.ResetPasswordRequest;
import com.dev.library_management_system.payload.response.ApiResponse;
import com.dev.library_management_system.payload.response.AuthResponse;
import com.dev.library_management_system.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signupHandler(@RequestBody @Valid UserDto req) throws UserException {
        AuthResponse res = authService.signup(req);
        return ResponseEntity.ok(res);

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody @Valid LoginRequest req) throws UserException {
        AuthResponse res = authService.login(req.getEmail(), req.getPassword());
        return ResponseEntity.ok(res);

    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPasswordHandler(@RequestBody ForgotPasswordRequest request) throws UserException {
        authService.createPasswordResetToken(request.getEmail());

        ApiResponse res = new ApiResponse("A Reset Link was sent to your email", true);
        return ResponseEntity.ok(res);
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody ResetPasswordRequest request) throws UserException, Exception {
        authService.resetPassword(request.getToken(), request.getPassword());
        ApiResponse res = new ApiResponse("Password Reset Successfully", true);
        return ResponseEntity.ok(res);
    }



}
