package com.dev.library_management_system.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookSearchRequest {

    private String searchTerm;
    private Long genreId;
    private Boolean availableOnly;
    private Integer page=0;
    private Integer size=20;
    private Integer sort;
    private String sortBy="createdAt";
    private String sortDirection="desc";

}
