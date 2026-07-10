package com.dev.library_management_system.contoller;

import com.dev.library_management_system.exception.BookException;
import com.dev.library_management_system.payload.dto.BookDto;
import com.dev.library_management_system.services.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/books")
public class AdminBookController {

    private final BookService bookService;

    @PostMapping()
    public ResponseEntity<BookDto> createBook(@Valid @RequestBody BookDto bookDto) throws BookException {
        BookDto createdBook = bookService.createBook(bookDto);
        return ResponseEntity.ok(createdBook);
    }
}
