package com.dev.library_management_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String isbn;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Genre genre;

    private String publisher;

    private LocalDate publishedDate;

    private String language;

    private String description;

    private Integer pages;

    @Column(nullable = false)
    private Integer totalCopies;

    private Integer availableCopies;

    private BigDecimal price;

    private String coverImageUrl;

    @Column(nullable = false)
    private Boolean active=true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @AssertTrue(message = "Available Copies cannot exceed total copies")
    public boolean isAvailableCopiesValid(){
        if(totalCopies == null || availableCopies == null){
            return true;
        }
        return availableCopies<=totalCopies;
    }



}
