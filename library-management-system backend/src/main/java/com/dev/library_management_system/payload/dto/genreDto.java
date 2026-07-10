package com.dev.library_management_system.payload.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class genreDto {

    private Long id;
    @NotBlank(message = "Genre Code is Mandatory")
    private String code;

    @NotBlank(message = "Genre Name is Mandatory")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500")
    private String description;

    @Min(value = 0, message = "display order cannot be negative")
    private Integer displayOrder=0;

    private Boolean active;

    private Long parentGenreId;

    private String parentGenreName;

    private List<genreDto> subgenres;

    private Long bookcount;

    private LocalDateTime createdDate;

    private LocalDateTime updateddDate;



}
