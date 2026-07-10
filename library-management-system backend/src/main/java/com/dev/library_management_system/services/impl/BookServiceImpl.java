package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.exception.BookException;
import com.dev.library_management_system.mapper.BookMapper;
import com.dev.library_management_system.model.Book;
import com.dev.library_management_system.payload.dto.BookDto;
import com.dev.library_management_system.payload.request.BookSearchRequest;
import com.dev.library_management_system.payload.response.PageResponse;
import com.dev.library_management_system.repository.BookRepository;
import com.dev.library_management_system.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService  {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    

    @Override
    public BookDto createBook(BookDto bookDto) throws BookException {
        if(bookRepository.existsByIsbn(bookDto.getIsbn())) {
            throw new BookException("book with isbn "+bookDto.getIsbn()+"already exits");
        }

        Book book = bookMapper.toEntity(bookDto);
        //total-10
        //available -11

        book.isAvailableCopiesValid();

        Book savedBook = bookRepository.save(book);


        return bookMapper.toDto(savedBook);
    }

    @Override
    public List<BookDto> createBooksBulk(List<BookDto> bookDtos) throws BookException {

        List<BookDto> createdBooks = new ArrayList<>();
        for(BookDto bookDto: bookDtos) {
            BookDto book = createBook(bookDto);
            createdBooks.add(book);
        }
        return createdBooks;
    }

    @Override
    public BookDto getBookById(Long bookId) throws BookException {

        Book book = bookRepository.findById(bookId).orElseThrow(()-> new BookException("Book not found"));
        return bookMapper.toDto(book);
    }

    @Override
    public BookDto getBookByISBN(String isbn) throws BookException {

        Book book = bookRepository.findByIsbn(isbn).orElseThrow(()-> new BookException("Book not found"));
        return bookMapper.toDto(book);
    }

    @Override
    public BookDto updateBook(Long bookId, BookDto bookDto) throws BookException {
        Book existingBook = bookRepository.findById(bookId).orElseThrow(()-> new BookException("Book not found!"));
        bookMapper.updateEntityFromDto(bookDto,existingBook);
        existingBook.isAvailableCopiesValid();
        Book savedBook = bookRepository.save(existingBook);
        return bookMapper.toDto(savedBook);
    }

    @Override
    public void deleteBookById(Long bookId) throws BookException {
        Book existingBook = bookRepository.findById(bookId).orElseThrow(()->new BookException("Book not found"));
        existingBook.setActive(false);
        bookRepository.save(existingBook);

    }

    @Override
    public void hardDeleteBook(Long bookId) throws BookException {

        Book existingBook = bookRepository.findById(bookId).orElseThrow(()->new BookException("Book not found"));
        bookRepository.delete(existingBook);

    }

    @Override
    public PageResponse<BookDto> searchBooksWithFilters(BookSearchRequest searchRequest) {

        Pageable pageable = createPageRequest(searchRequest.getPage(),
                searchRequest.getSize(),
                searchRequest.getSortBy(),
                searchRequest.getSortDirection()
                );
        Page<Book> bookPage = bookRepository.searchBookWithFilters(
                searchRequest.getSearchTerm(),
                searchRequest.getGenreId(),
                searchRequest.getAvailableOnly(),
                pageable

        );
        return convertToPageResponse(bookPage);
    }

    @Override
    public long getTotalActiveBooks() {

        return bookRepository.countByActiveTrue();
    }

    @Override
    public long getTotalAvailableBooks() {

        return bookRepository.countAvailableBooks();
    }

    private Pageable createPageRequest(int page, int size, String sortBy, String sortDirectionn) {
        size = Math.min(size, 50);
        //size = Math.min(size, 1);

        Sort sort = sortDirectionn.equalsIgnoreCase("ASC")
                ?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();

        return PageRequest.of(page, size, sort);
    }

    private PageResponse<BookDto> convertToPageResponse(Page<Book> books) {
        List<BookDto> bookDtos = books.getContent()
                .stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());

        return new PageResponse<>(bookDtos,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isLast(),
                books.isFirst(),
                books.isEmpty()
                );
    }
}
