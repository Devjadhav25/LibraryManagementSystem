import React, { useState, useEffect } from 'react';
import { AutoAwesome, BookmarkAdd } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';

// Mock Data - Replace with API later
const mockRecommendations = [
  {
    id: 201,
    bookTitle: "Java Concurrency in Practice",
    bookAuthor: "Brian Goetz",
    coverImageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=400",
    genre: "Java Language",
    reason: "Because you read Effective Java",
  },
  {
    id: 202,
    bookTitle: "Spring Microservices in Action",
    bookAuthor: "John Carnell",
    coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400",
    genre: "Spring Framework",
    reason: "Trending in your cohort",
  }
];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [loading, setLoading] = useState(false);

  /*
  // TODO: Uncomment when API is ready
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // const response = await api.get('/recommendations/user');
        // setRecommendations(response.data);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);
  */

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <AutoAwesome sx={{ color: '#9333EA' }} /> Recommended for You
        </h3>
        <p className="text-gray-500 mt-1">Handpicked books based on your reading history and preferences.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><CircularProgress sx={{ color: '#9333EA' }} /></div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No recommendations available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((book) => (
            <div key={book.id} className="flex flex-col sm:flex-row bg-white rounded-2xl shadow border border-indigo-50 hover:shadow-lg transition-all overflow-hidden group">
              <div className="sm:w-1/3 relative">
                <img src={book.coverImageUrl} alt={book.bookTitle} className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-700 mb-2">
                    {book.reason}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">{book.bookTitle}</h4>
                  <p className="text-sm text-gray-600 mt-1">{book.bookAuthor}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{book.genre}</span>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<BookmarkAdd />}
                    sx={{ 
                      bgcolor: '#111827', 
                      '&:hover': { bgcolor: '#374151' },
                      borderRadius: '8px',
                      textTransform: 'none'
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
  );
};

export default Recommendations;