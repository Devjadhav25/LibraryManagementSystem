import React, { useState, useEffect } from 'react';
import { History, StarBorder, MenuBook } from '@mui/icons-material';
import { CircularProgress, Button } from '@mui/material';

// Mock Data - Replace with API later
const mockHistory = [
  {
    id: 101,
    bookTitle: "Effective Java",
    bookAuthor: "Joshua Bloch",
    coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    checkoutDate: "2026-01-10",
    returnedDate: "2026-02-05",
    genre: "Java Language"
  },
  {
    id: 102,
    bookTitle: "Spring Boot in Action",
    bookAuthor: "Craig Walls",
    coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
    checkoutDate: "2025-11-20",
    returnedDate: "2025-12-15",
    genre: "Spring Framework"
  }
];

const ReadingHistory = () => {
  const [history, setHistory] = useState(mockHistory);
  const [loading, setLoading] = useState(false);

  /*
  // TODO: Uncomment when API is ready
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // const response = await api.get('/loans/history');
        // setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch reading history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  */

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <History sx={{ color: '#4F46E5' }} /> Reading History
      </h3>

      {loading ? (
        <div className="flex justify-center p-12"><CircularProgress sx={{ color: '#4F46E5' }} /></div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">You haven't completed any books yet. Start reading!</div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <img src={item.coverImageUrl} alt={item.bookTitle} className="w-12 h-16 rounded object-cover" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{item.bookTitle}</h4>
                  <p className="text-sm text-gray-500">by {item.bookAuthor} • <span className="text-indigo-500 font-medium">{item.genre}</span></p>
                  <p className="text-xs text-gray-400 mt-1">
                    Borrowed: {new Date(item.checkoutDate).toLocaleDateString()} — Returned: {new Date(item.returnedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-3">
                <Button variant="text" size="small" startIcon={<StarBorder />} sx={{ color: '#6B7280' }}>
                  Rate
                </Button>
                <Button variant="outlined" size="small" startIcon={<MenuBook />} sx={{ borderColor: '#E5E7EB', color: '#374151' }}>
                  Borrow Again
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingHistory;