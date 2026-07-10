import { Person } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/books/${book.id}`);
    };

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:-translate-y-1">
            {/* book cover */}
            <div className='relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden'>
                <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            
            {/* book details */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{book.title}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <Person sx={{ fontSize: 16 }} />
                    <span className="text-sm line-clamp-1">{book.author}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>ISBN: {book.isbn}</span>
                    <span>{book.availableCopies}/{book.totalCopies} copies</span>
                </div>

                {/* description preview */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {book.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                        {book.genre?.name || "Uncategorized"}
                    </span>
                </div>
                
                {/* action buttons */}
                <div className="mt-4 flex gap-2">
                    <Button variant='outlined'
                        fullWidth
                        onClick={handleViewDetails}
                        sx={{
                            textTransform: 'none',
                            borderColor: '#4F46E5',
                            color: '#4F46E5',
                            fontWeight: 600,
                            '&:hover': {
                                borderColor: '#4338CA',
                                bgcolor: '#EEF2FF'
                            },
                        }}>
                        view
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;