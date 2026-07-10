package com.dev.library_management_system.contoller;

import com.dev.library_management_system.exception.GenreException;
import com.dev.library_management_system.model.Genre;
import com.dev.library_management_system.payload.dto.genreDto;
import com.dev.library_management_system.payload.response.ApiResponse;
import com.dev.library_management_system.services.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    @PostMapping("/create")
    public ResponseEntity<genreDto> addGenre(@RequestBody genreDto genredto){
        genreDto createdGenre = genreService.createGenre(genredto);
        return ResponseEntity.ok(createdGenre);


    }
    @GetMapping()
    public ResponseEntity<?> getAllGenres(@RequestBody genreDto genredto){
        List<genreDto> allGenres = genreService.getAllGenres();
        return ResponseEntity.ok(allGenres);
    }

    @GetMapping("/{genreId}")
    public ResponseEntity<?> getGenreById(
            @PathVariable("genreId") Long genreId) throws GenreException {
        genreDto genres = genreService.getGenrebyId(genreId);
        return ResponseEntity.ok(genres);
    }

    @PutMapping("/{genreId}")
    public ResponseEntity<?> updateGenre(
            @PathVariable("genreId") Long genreId, @RequestBody genreDto genre) throws GenreException {
        genreDto genres = genreService.updateGenre(genreId,  genre);
        return ResponseEntity.ok(genres);
    }

    @DeleteMapping("/{genreId}")
    public ResponseEntity<?> deleteGenre(
            @PathVariable("genreId") Long genreId) throws GenreException {
        genreService.deleteGenre(genreId);
        ApiResponse apiResponse = new ApiResponse("Genre Deleted -soft delete", true);
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{genreId}/hard")
    public ResponseEntity<?> hardDeleteGenre(
            @PathVariable("genreId") Long genreId) throws GenreException {
        genreService.hardDeleteGenre(genreId);
        ApiResponse apiResponse = new ApiResponse("Genre Deleted - hard delete", true);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/top-level")
    public ResponseEntity<?> getTopLevelGenres(@RequestBody genreDto genredto){
        List<genreDto> genres = genreService.getTopLevelGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getTotalActiveGenres(@RequestBody genreDto genredto){
        Long genres = genreService.getTotalActiveGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/{id}/book-count")
    public ResponseEntity<?> getBookCountByGenres(@PathVariable Long id){
        Long count = genreService.getBookCountByGenre(id);

        return ResponseEntity.ok(count);
    }




}
