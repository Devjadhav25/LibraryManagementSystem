package com.dev.library_management_system.mapper;

import com.dev.library_management_system.model.Genre;
import com.dev.library_management_system.payload.dto.genreDto;
import com.dev.library_management_system.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GenreMapper {

    private final GenreRepository genreRepository;


    public static genreDto toDto(Genre savedGenre) {
        if(savedGenre==null){
            return null;

        }


        genreDto dto = genreDto.builder()
                .id(savedGenre.getId())
                .code(savedGenre.getCode())
                .name(savedGenre.getName())
                .description(savedGenre.getDescription())
                .displayOrder(savedGenre.getDisplayOrder())
                .active(savedGenre.getActive())
                .createdDate(savedGenre.getCreatedAt())
                .updateddDate(savedGenre.getUpdatedAt())
                .build();

        if(savedGenre.getParentGenre() != null){
            dto.setParentGenreId(savedGenre.getParentGenre().getId());
            dto.setParentGenreName(savedGenre.getParentGenre().getName());

        }

        if(savedGenre.getSubGenres() != null && !savedGenre.getSubGenres().isEmpty()){

            dto.setSubgenres(savedGenre
                    .getSubGenres()
                    .stream()
                    .filter(SubGenre-> SubGenre.getActive())
                    .map(SubGenre ->toDto(SubGenre)).collect(Collectors.toList()));
//
        }

         //dto.setBookcount((long)(savedGenre.get));

        return dto;


    }

    public Genre  toEntity(genreDto genredto) {
        if(genredto==null){
            return null;
        }
        Genre genre = Genre.builder()
                .code(genredto.getCode())
                .name(genredto.getName())
                .description(genredto.getDescription())
                .displayOrder(genredto.getDisplayOrder())
                .active(true)
                .build();

        if(genredto.getParentGenreId() != null){
            genreRepository.findById(genredto.getParentGenreId()).ifPresent(
                    genre::setParentGenre
            );

        }

        return genre;

    }

    public  void updateEntityFromDto(genreDto dto, Genre existinggenre ){
        if(dto==null || existinggenre==null){
            return;
        }

        existinggenre.setCode(dto.getCode());
        existinggenre.setName(dto.getName());
        existinggenre.setDescription(dto.getDescription());
        existinggenre.setDisplayOrder(dto.getDisplayOrder() !=null ? dto.getDisplayOrder() : 0);

        if(dto.getActive() != null){
            existinggenre.setActive(dto.getActive());

        }
        if(dto.getParentGenreId() != null){
            genreRepository.findById(dto.getParentGenreId()).ifPresent(existinggenre::setParentGenre);
        }


    }

    public List<genreDto> toDtoList(List<Genre> genreList){
        return genreList.stream().map(genre -> toDto(genre)).collect(Collectors.toList());
    }

}
