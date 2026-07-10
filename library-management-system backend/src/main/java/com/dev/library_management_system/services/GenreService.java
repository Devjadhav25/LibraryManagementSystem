package com.dev.library_management_system.services;

import com.dev.library_management_system.exception.GenreException;
import com.dev.library_management_system.model.Genre;
import com.dev.library_management_system.payload.dto.genreDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenreService {

    genreDto createGenre(genreDto genredto) ;

    List<genreDto> getAllGenres();

    genreDto getGenrebyId(Long genreId) throws GenreException;

    genreDto updateGenre(Long genreId ,genreDto genredto) throws GenreException;

    void deleteGenre(Long genreId) throws GenreException;

    void hardDeleteGenre(Long genreId) throws GenreException;

    List<genreDto> getAllActiveGenreWithSubGenres();

    List<genreDto> getTopLevelGenres();

    //Page<genreDto> searchGenres(String searchTerm, Pageable pageable);

    long getTotalActiveGenres();

    long getBookCountByGenre(Long genreId);



}
