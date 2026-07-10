import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import GenreFilter from "./GenreFilter";
import { FormControl, MenuItem, InputLabel, Select, TextField, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [page, setPage] = useState(0);

  // Fetch Genres on mount (Mocked for UI testing)
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // API Call Disabled
        // const response = await fetch('http://localhost:5000/api/genres');
        // const data = await response.json();
        // setGenres(data);
        
        // Mock Genres for UI
        setGenres([
            { id: "Programming", name: "Programming" },
            { id: "Java Language", name: "Java Language" },
            { id: "Spring Framework", name: "Spring Framework" }
        ]);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch Books whenever filters change (Mocked for UI testing)
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // API Call Disabled
        // let url = `http://localhost:5000/api/books?page=${page}&size=20&sortBy=${sortBy}&sortDirection=${sortDirection}`;
        // if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
        // if (selectedGenreId && selectedGenreId !== 'all') url += `&genreId=${selectedGenreId}`;
        // if (availabilityFilter === 'AVAILABLE') url += `&availableOnly=true`;
        // else if (availabilityFilter === 'CHECKED_OUT') url += `&availableOnly=false`;
        // const response = await fetch(url);
        // const data = await response.json();
        // let filteredBooks = Array.isArray(data.content) ? data.content : (Array.isArray(data) ? data : []); 
        
        // Mock Data Integration
        let filteredBooks = [
          {
            id: 1,
            title: "Clean Code",
            author: "Robert C. Martin",
            isbn: "978-0-13-235088-4",
            availableCopies: 3,
            totalCopies: 5,
            description: "A practical guide to writing clean, maintainable, and efficient code.",
            genre: { name: "Programming" },
            coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
          },
          {
            id: 2,
            title: "Effective Java",
            author: "Joshua Bloch",
            isbn: "978-0-13-468599-1",
            availableCopies: 0,
            totalCopies: 2,
            description: "Comprehensive guide to best practices for the Java programming language.",
            genre: { name: "Java Language" },
            coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
          },
          {
            id: 3,
            title: "Spring Boot in Action",
            author: "Craig Walls",
            isbn: "978-1-61-729254-5",
            availableCopies: 4,
            totalCopies: 4,
            description: "Learn how to build Spring applications rapidly and effectively.",
            genre: { name: "Spring Framework" },
            coverImageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800"
          }
        ];

        // Client-side search filtering
        if (searchTerm) {
          filteredBooks = filteredBooks.filter(book => 
            book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.author?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        // Client-side Genre filtering for UI testing
        if (selectedGenreId && selectedGenreId !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.genre?.name === selectedGenreId);
        }

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedGenreId, availabilityFilter, sortBy, sortDirection, page, searchTerm]);

  const handleGenreChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedGenreId(value);
  };

  const handleSortChange = (sortValue) => {
    const [field, direction] = sortValue.split('-');
    setSortBy(field);
    setSortDirection(direction.toUpperCase());
  }

  const getCurrentSortValue = () => {
    return `${sortBy}-${sortDirection.toLowerCase()}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 text-center">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-4xl text-gray-900 mb-2">
            <h1 className="font-bold">
              Browse Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Discover thousands of books across all genres
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filter */}
          <aside className="lg:w-72 space-y-6">
            <div className="space-y-6">
              <GenreFilter onGenreSelect={handleGenreChange} selectedGenreId={selectedGenreId} genres={genres} />
              
              {/* Availability Filter */}
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="flex flex-col mb-4 pb-3 border-b border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Filter by Availability</h3>
                  <FormControl fullWidth>
                    <Select
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                    >
                      <MenuItem value={"All"}>All Books</MenuItem>
                      <MenuItem value="AVAILABLE">Available Only</MenuItem>
                      <MenuItem value="CHECKED_OUT">Checked Out</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Search and Sort Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <TextField
                  fullWidth
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }
                  }}
                />
              </div>

              <div className="md:w-64">
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={getCurrentSortValue()}
                    onChange={(e) => handleSortChange(e.target.value)}
                    label="Sort By"
                    startAdornment={
                      <InputAdornment position="start">
                        <SortIcon className="text-gray-400" />
                      </InputAdornment>
                    }
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F46E5' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F46E5' },
                    }}
                  >
                    <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                    <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                    <MenuItem value="author-asc">Author (A-Z)</MenuItem>
                    <MenuItem value="author-desc">Author (Z-A)</MenuItem>
                    <MenuItem value="createdAt-desc">Newest First</MenuItem>
                    <MenuItem value="createdAt-asc">Oldest First</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Books Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress sx={{ color: '#4F46E5' }} />
              </div>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-100">
                <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BookPage;