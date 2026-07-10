package com.dev.library_management_system.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize -> Authorize
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/api/subscription-plans/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class) //UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigrationSource()))
                .build();

    }

    private CorsConfigurationSource corsConfigrationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();

                // 1. Allow the specific frontend URLs (Pass the List directly)
                cfg.setAllowedOrigins(Arrays.asList(
                        "http://localhost:5173",
                        "https://devlibrary.com"
                ));

                // 2. Use setAllowedMethods which accepts a List
                cfg.setAllowedMethods(Collections.singletonList("*"));

                // 3. Allow all headers and credentials for JWT/Cookies
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                //cfg.setAllowCredentials(true);

                // 4. Expose headers if your frontend needs to read the JWT from a header
                cfg.setExposedHeaders(Collections.singletonList("Authorization"));
                cfg.setMaxAge(360L);
                // 5. CRITICAL: Return the config object, NOT null
                return cfg;
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
