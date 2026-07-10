package com.dev.library_management_system.mapper;

import com.dev.library_management_system.exception.BookException;
import com.dev.library_management_system.model.Book;
import com.dev.library_management_system.model.Genre;
import com.dev.library_management_system.payload.dto.BookDto;
import com.dev.library_management_system.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookMapper {

    private final GenreRepository genreRepository;

    public BookDto toDto(Book book) {
        if(book==null){
            return null;
        }
        BookDto dto= BookDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .isbn(book.getIsbn())
                .genreName(book.getGenre().getName())
                .genreCode(book.getGenre().getCode())
                .genreId(book.getGenre().getId())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .publicationDate(book.getPublishedDate())
                .language(book.getLanguage())
                .description(book.getDescription())
                .price(book.getPrice())
                .pages(book.getPages())
                .availableCopies(book.getAvailableCopies())
                .totalCopies(book.getTotalCopies())
                .coverImageUrl(book.getCoverImageUrl())
                .active(book.getActive())
                .createdAt(book.getCreatedAt())
                .updatedAt(book.getUpdatedAt())
                .build();

        return dto;
    }

    public Book toEntity(BookDto bookDto) throws BookException {
        if(bookDto==null){
            return null;
        }

        Book book = new Book();
        book.setId(bookDto.getId());
        book.setTitle(bookDto.getTitle());
        book.setIsbn(bookDto.getIsbn());
        book.setAuthor(bookDto.getAuthor());

        if(bookDto.getGenreId()!=null){
            Genre genre = genreRepository.findById(bookDto.getGenreId()).orElseThrow(()->new BookException("Genre with id "+bookDto.getGenreId()+" not found"));
            book.setGenre(genre);
        }

        book.setPublisher(bookDto.getPublisher());
        book.setPublishedDate(bookDto.getPublicationDate());
        book.setLanguage(bookDto.getLanguage());
        book.setDescription(bookDto.getDescription());
        book.setPrice(bookDto.getPrice());
        book.setPages(bookDto.getPages());
        book.setAvailableCopies(bookDto.getAvailableCopies());
        book.setTotalCopies(bookDto.getTotalCopies());
        book.setCoverImageUrl(bookDto.getCoverImageUrl());
        book.setActive(bookDto.getActive());

        return book;
    }

    public void updateEntityFromDto(BookDto bookDto, Book book) throws BookException {
        if(bookDto==null){
            return;
        }
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());

        // update genre if provided
        if(bookDto.getGenreId()!=null){
            Genre genre = genreRepository.findById(bookDto.getGenreId())
                    .orElseThrow(()-> new BookException("Genre with id "+bookDto.getGenreId()+" not found"));
            book.setGenre(genre);
        }

        book.setPublisher(bookDto.getPublisher());
        book.setPublishedDate(bookDto.getPublicationDate());
        book.setLanguage(bookDto.getLanguage());
        book.setDescription(bookDto.getDescription());
        book.setPrice(bookDto.getPrice());
        book.setPages(bookDto.getPages());
        book.setAvailableCopies(bookDto.getAvailableCopies());
        book.setTotalCopies(bookDto.getTotalCopies());
        book.setCoverImageUrl(bookDto.getCoverImageUrl());

        if(bookDto.getActive()!=null){
            book.setActive(bookDto.getActive());
        }

    }

}
