package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.exception.GenreException;
import com.dev.library_management_system.mapper.GenreMapper;
import com.dev.library_management_system.model.Genre;
import com.dev.library_management_system.payload.dto.genreDto;
import com.dev.library_management_system.repository.GenreRepository;
import com.dev.library_management_system.services.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImp implements GenreService {


    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;


    @Override
    public genreDto createGenre(genreDto genredto) {

        //return genreRepository.save(genredto);

        Genre genre =genreMapper.toEntity(genredto);
        Genre savedGenre = genreRepository.save(genre);

        return GenreMapper.toDto(savedGenre);
    }

    @Override
    public List<genreDto> getAllGenres() {
        return genreRepository.findAll().stream().map(GenreMapper::toDto).toList();
    }

    @Override
    public genreDto getGenrebyId(Long genreId) throws GenreException {
        Genre genre=  genreRepository.findById(genreId).orElseThrow(()-> new GenreException("genre not found"));
        return genreMapper.toDto(genre);
    }

    @Override
    public genreDto updateGenre(Long genreId, genreDto genredto) throws GenreException {
        Genre existingGenre = genreRepository.findById(genreId).orElseThrow(()->new GenreException(("genre not found")));

        genreMapper.updateEntityFromDto(genredto,existingGenre);

        Genre updatedGenre = genreRepository.save(existingGenre);
        return genreMapper.toDto(updatedGenre);
    }

    @Override
    public void deleteGenre(Long genreId) throws GenreException {
        Genre existingGenre = genreRepository.findById(genreId).orElseThrow(()->new GenreException(("genre not found")));

        existingGenre.setActive(false);
        genreRepository.save(existingGenre);

    }

    @Override
    public void hardDeleteGenre(Long genreId) throws GenreException {

        Genre existingGenre = genreRepository.findById(genreId).orElseThrow(()->new GenreException(("genre not found")));
        genreRepository.delete(existingGenre);
    }

    @Override
    public List<genreDto> getAllActiveGenreWithSubGenres() {
        List<Genre> topLevelGenres = genreRepository
                .findByParentGenreIsNullAndActiveTrueOrderByDisplayOrderAsc();

        return genreMapper.toDtoList(topLevelGenres);
    }

    @Override
    public List<genreDto> getTopLevelGenres() {
        List<Genre> topLevelGenres = genreRepository
                .findByParentGenreIsNullAndActiveTrueOrderByDisplayOrderAsc();

        return genreMapper.toDtoList(topLevelGenres);
    }

    @Override
    public long getTotalActiveGenres() {
        return genreRepository.countByActiveTrue();
    }

    @Override
    public long getBookCountByGenre(Long genreId) {
        return 0;
    }
}
