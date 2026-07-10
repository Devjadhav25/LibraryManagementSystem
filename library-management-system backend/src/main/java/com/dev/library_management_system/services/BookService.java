package com.dev.library_management_system.services;

import com.dev.library_management_system.exception.BookException;
import com.dev.library_management_system.payload.dto.BookDto;
import com.dev.library_management_system.payload.request.BookSearchRequest;
import com.dev.library_management_system.payload.response.PageResponse;

import java.util.List;

public interface BookService {

    BookDto createBook(BookDto bookDto) throws BookException;
    List<BookDto> createBooksBulk(List<BookDto> bookDtos) throws BookException;
    BookDto getBookById(Long bookId) throws BookException;
    BookDto getBookByISBN(String isbn) throws BookException;
    BookDto updateBook(Long bookId, BookDto bookDto) throws BookException;
    void deleteBookById(Long bookId) throws BookException;
    void hardDeleteBook(Long bookId) throws BookException;

    PageResponse<BookDto> searchBooksWithFilters(
            BookSearchRequest searchRequest
    );
    long getTotalActiveBooks();
    long getTotalAvailableBooks();
}
