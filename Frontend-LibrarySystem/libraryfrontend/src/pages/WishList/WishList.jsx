import React, { useState, useEffect } from 'react';
import Favorite from '@mui/icons-material/Favorite';
// Changed to the solid Delete icon to fix the Vite import error
import Delete from '@mui/icons-material/Delete';
import BookmarkAdd from '@mui/icons-material/BookmarkAdd';
import { Button, CircularProgress, IconButton } from '@mui/material';

// Mock Data
const mockWishlist = [
  {
    id: 1,
    bookTitle: "Clean Code",
    bookAuthor: "Robert C. Martin",
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
    genre: "Programming",
    availableCopies: 5,
    addedOn: "2026-07-01"
  },
  {
    id: 2,
    bookTitle: "Designing Data-Intensive Applications",
    bookAuthor: "Martin Kleppmann",
    coverImageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=400",
    genre: "Architecture",
    availableCopies: 0,
    addedOn: "2026-07-05"
  }
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [loading, setLoading] = useState(false);

  /* ==========================================
     API CALL (Commented out for now)
     ==========================================
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        // const response = await api.get('/api/wishlist/user');
        // setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);
  */

  const handleRemove = (id) => {
    // Optimistic UI update (Add actual API delete call here later)
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-end animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg">
                <Favorite sx={{ color: 'white', fontSize: 28 }} />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                My <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">Wishlist</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 ml-16">Books you've saved for later reading.</p>
          </div>
          <p className="hidden md:block text-gray-500 font-medium">{wishlist.length} items saved</p>
        </div>
        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64"><CircularProgress sx={{ color: '#E11D48' }} /></div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Favorite sx={{ fontSize: 64, color: '#FCE7F3', mb: 2 }} />
            <h3 className="text-xl font-bold text-gray-900 mb-1">Your Wishlist is Empty</h3>
            <p className="text-gray-500">Go to the Browse Books page to discover and save titles you love.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
                
                {/* FIX 2: Added 'shrink-0' so the image doesn't squash */}
                <div className="relative h-56 shrink-0 overflow-hidden bg-gray-100">
                  <img 
                    src={book.coverImageUrl} 
                    alt={book.bookTitle} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <IconButton size="small" onClick={() => handleRemove(book.id)} color="error" title="Remove from Wishlist">
                      <Delete fontSize="small" />
                    </IconButton>
                  </div>
                </div>

                {/* FIX 3: Replaced 'h-[180px]' with 'flex-1' to let it expand naturally */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 mb-1">{book.bookTitle}</h3>
                    <p className="text-sm text-gray-600 mb-2">{book.bookAuthor}</p>
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                      {book.genre}
                    </span>
                  </div>
                  
                  {/* FIX 4: Added 'gap-2' and 'leading-tight' so wrapped text looks clean */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold leading-tight ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Currently Unavailable'}
                    </span>
                    <Button 
                      variant="contained" 
                      size="small" 
                      disabled={book.availableCopies === 0}
                      startIcon={<BookmarkAdd />}
                      sx={{ 
                        bgcolor: '#1e293b', 
                        '&:hover': { bgcolor: '#0f172a' },
                        textTransform: 'none',
                        boxShadow: 'none',
                        flexShrink: 0 // Prevents the button from shrinking
                      }}
                    >
                      Reserve
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}


        </div>
    </div>
  );
};

export default Wishlist;