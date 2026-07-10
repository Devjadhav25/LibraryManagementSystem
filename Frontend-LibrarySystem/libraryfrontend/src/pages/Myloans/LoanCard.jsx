import React from 'react';
import MenuBook from '@mui/icons-material/MenuBook';
import Person from '@mui/icons-material/Person';
import Numbers from '@mui/icons-material/Numbers';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AssignmentReturn from '@mui/icons-material/AssignmentReturn';
import { Button, Chip, Divider } from '@mui/material';

const LoanCard = ({ loan }) => {
  // Helper to determine status color
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'primary';
      case 'OVERDUE': return 'error';
      case 'RETURNED': return 'success';
      case 'LOST':
      case 'DAMAGED': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-grow">
        
        {/* Top Section: Cover & Basic Info */}
        <div className="flex gap-4 mb-4">
          {/* Book Cover with Gradient Border effect */}
          <div className="w-24 h-36 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 flex-shrink-0 shadow-sm">
            <img 
              src={loan.coverImageUrl} 
              alt={loan.bookTitle} 
              className="w-full h-full object-cover rounded-lg bg-white"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
                {loan.bookTitle}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 text-gray-600 mb-1 text-sm">
              <Person sx={{ fontSize: 16 }} />
              <span>{loan.bookAuthor}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
              <Numbers sx={{ fontSize: 14 }} />
              <span>ISBN: {loan.isbn}</span>
            </div>

            <Chip 
              label={loan.status} 
              color={getStatusColor(loan.status)} 
              size="small" 
              sx={{ fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '0.05em' }}
            />
          </div>
        </div>

        <Divider sx={{ my: 2 }} />

        {/* Middle Section: Dates */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-semibold">Checked Out</span>
            <div className="flex items-center gap-1.5 text-gray-900 text-sm font-medium">
              <CalendarToday sx={{ fontSize: 16, color: '#6B7280' }} />
              {new Date(loan.checkoutDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-semibold">Due Date</span>
            <div className="flex items-center gap-1.5 text-gray-900 text-sm font-medium">
              <CalendarToday sx={{ fontSize: 16, color: loan.status === 'OVERDUE' ? '#EF4444' : '#6B7280' }} />
              <span className={loan.status === 'OVERDUE' ? 'text-red-600' : ''}>
                {new Date(loan.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {/* Only show return date if the book has been returned */}
          {loan.returnDate && (
            <div className="col-span-2 mt-2 p-2 bg-green-50 rounded-lg border border-green-100">
              <span className="text-xs text-green-800 block mb-1 uppercase tracking-wider font-semibold">Returned On</span>
              <div className="flex items-center gap-1.5 text-green-900 text-sm font-medium">
                <AssignmentReturn sx={{ fontSize: 16 }} />
                {new Date(loan.returnDate).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Notes Section (Optional) */}
        {loan.note && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700 italic">
              <strong className="not-italic text-gray-900">Note: </strong> 
              {loan.note}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 mt-auto">
        <Button variant="outlined" size="small" sx={{ borderColor: '#E5E7EB', color: '#374151' }}>
          View Details
        </Button>
        
        {/* Only show "Return Book" if it is currently active or overdue */}
        {(loan.status === 'ACTIVE' || loan.status === 'OVERDUE') && !loan.returnDate && (
          <Button variant="contained" size="small" sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }}>
            Return Book
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoanCard;