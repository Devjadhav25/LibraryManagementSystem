package com.dev.library_management_system.repository;

import com.dev.library_management_system.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre,Long> {

    List<Genre>findByActiveTrueOrderByDisplayOrderAsc();

    List<Genre>findByParentGenreIsNullAndActiveTrueOrderByDisplayOrderAsc();

    List<Genre> findByParentGenreIdAndActiveTrueOrderByDisplayOrderAsc(
            Long parentGenreId
    );

    long countByActiveTrue();

//    @Query("Select count(b) from book b where b.genre.id:genreId")
//    long countBookByGenre(@Param("genreId") Long genreId);
}
