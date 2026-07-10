import React, { useState, useEffect } from 'react';

// Fixed Default Imports - Using standard solid icons to prevent Vite resolution errors
import AccessTime from '@mui/icons-material/AccessTime';
import EventAvailable from '@mui/icons-material/EventAvailable';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import LibraryBooks from '@mui/icons-material/LibraryBooks';

import { Chip, Button, CircularProgress } from '@mui/material';

// Mock Data - Replace with API later
const mockReservations = [
  {
    id: 1,
    bookTitle: "Designing Data-Intensive Applications",
    bookAuthor: "Martin Kleppmann",
    coverImageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=400",
    reservedDate: "2026-06-15",
    status: "AVAILABLE", // PENDING, AVAILABLE, FULFILLED, CANCELLED
    queuePosition: 0,
  },
  {
    id: 2,
    bookTitle: "Clean Architecture",
    bookAuthor: "Robert C. Martin",
    coverImageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400",
    reservedDate: "2026-07-02",
    status: "PENDING",
    queuePosition: 3,
  }
];

const Reservation = () => {
  const [reservations, setReservations] = useState(mockReservations);
  const [loading, setLoading] = useState(false);

  /* // TODO: Uncomment when Spring Boot backend endpoint is ready
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        // Use your API utility here (e.g., axios with JWT interceptor)
        // const response = await api.get('/reservations/user');
        // setReservations(response.data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);
  */

  const getStatusChip = (status) => {
    switch(status) {
      case 'AVAILABLE': 
        return <Chip icon={<EventAvailable />} label="Ready for Pickup" color="success" size="small" />;
      case 'PENDING': 
        return <Chip icon={<AccessTime />} label="In Queue" color="warning" size="small" />;
      case 'FULFILLED': 
        return <Chip icon={<CheckCircle />} label="Fulfilled" color="default" size="small" />;
      case 'CANCELLED': 
        return <Chip icon={<Cancel />} label="Cancelled" color="error" size="small" />;
      default: 
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Your Reservations</h3>
        <span className="text-sm font-medium text-gray-500">{reservations.length} total</span>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <CircularProgress sx={{ color: '#4F46E5' }} />
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No active reservations found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Card Banner */}
              <div className={`h-2 ${res.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              
              <div className="p-5">
                <div className="flex items-start space-x-4">
                  <img src={res.coverImageUrl} alt={res.bookTitle} className="w-16 h-24 rounded-lg object-cover shadow-sm" />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 line-clamp-1">{res.bookTitle}</h4>
                    <p className="text-sm text-gray-600 mb-3">{res.bookAuthor}</p>
                    <div className="mb-2">
                      {getStatusChip(res.status)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Reserved: {new Date(res.reservedDate).toLocaleDateString()}
                  </span>
                  {res.status === 'PENDING' && (
                    <span className="font-semibold text-indigo-600">Queue: #{res.queuePosition}</span>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outlined" color="error" fullWidth size="small">Cancel</Button>
                  {res.status === 'AVAILABLE' && (
                    <Button variant="contained" sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }} fullWidth size="small">
                      Borrow Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservation;