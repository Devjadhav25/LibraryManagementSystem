package com.dev.library_management_system.payload.response;

import com.dev.library_management_system.payload.dto.genreDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private String message;
    private Boolean status;
}
