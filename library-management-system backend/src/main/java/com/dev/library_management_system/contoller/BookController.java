package com.dev.library_management_system.contoller;


import com.dev.library_management_system.exception.BookException;
import com.dev.library_management_system.payload.dto.BookDto;
import com.dev.library_management_system.payload.request.BookSearchRequest;
import com.dev.library_management_system.payload.response.ApiResponse;
import com.dev.library_management_system.payload.response.PageResponse;
import com.dev.library_management_system.repository.BookRepository;
import com.dev.library_management_system.services.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {
    private final BookRepository bookRepository;
    private final BookService bookService;



    @PostMapping("/bulk")
    public ResponseEntity<?> createBooksBulk(@Valid @RequestBody List<BookDto> bookDto) throws BookException {
        List<BookDto> createdBook = bookService.createBooksBulk(bookDto);
        return ResponseEntity.ok(createdBook);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable Long id) throws BookException {
        BookDto bookDto = bookService.getBookById(id);
        return ResponseEntity.ok(bookDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDto>  updateBook(@PathVariable Long id, @RequestBody BookDto bookDto) throws BookException {

            BookDto updatedBook = bookService.updateBook(id, bookDto);
            return ResponseEntity.ok(updatedBook);


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBook(@PathVariable Long id) throws BookException {
        bookService.deleteBookById(id);
        return ResponseEntity.ok(new ApiResponse("Book deleted Successfully", true));
    }

    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<ApiResponse> hardDeleteBook(@PathVariable Long id) throws BookException {
        bookService.hardDeleteBook(id);
        return ResponseEntity.ok(new ApiResponse("Book deleted Successfully", true));

    }
    @GetMapping
    public ResponseEntity<PageResponse<BookDto>> searchBooks(
            @RequestParam(required = false) Long genreId,
            @RequestParam(required = false, defaultValue = "False") Boolean availableOnly,
            @RequestParam(defaultValue = "true") boolean activeOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {

    // Build search request from query parameters
        BookSearchRequest searchRequest = new BookSearchRequest();
        searchRequest.setGenreId(genreId);
        searchRequest.setAvailableOnly(availableOnly);
        searchRequest.setPage(page);
        searchRequest.setSize(size);
        searchRequest.setSortBy(sortBy);
        searchRequest.setSortDirection(sortDirection);

        PageResponse<BookDto> books = bookService.searchBooksWithFilters(searchRequest);
        return ResponseEntity.ok(books);

    }


    @PostMapping("/search")
    public ResponseEntity<PageResponse<BookDto>> advancedSearch(
            @RequestBody BookSearchRequest searchRequest
            ){

        PageResponse<BookDto> books = bookService.searchBooksWithFilters(searchRequest);
        return ResponseEntity.ok(books);

    }

    @GetMapping("/stats")
    public ResponseEntity<BookStatsResponse> getBookStats() {
        long totalAvailableBooks = bookService.getTotalAvailableBooks();
        long totalActive= bookService.getTotalActiveBooks();

        BookStatsResponse stats = new BookStatsResponse(totalAvailableBooks, totalActive);
        return ResponseEntity.ok(stats);
    }

    public static class BookStatsResponse {
        public long totalActiveBooks;
        public long totalAvailableBooks;

        public BookStatsResponse(long totalActiveBooks, long totalAvailableBooks) {
            this.totalActiveBooks = totalActiveBooks;
            this.totalAvailableBooks = totalAvailableBooks;
        }

    }



}
