import React, { useState, useEffect } from 'react';
import EventAvailable from '@mui/icons-material/EventAvailable';
import HourglassBottom from '@mui/icons-material/HourglassBottom';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import AccessAlarm from '@mui/icons-material/AccessAlarm';
import { Button, CircularProgress } from '@mui/material';

// Dummy data mirroring the backend response
const mockReservations = [
  {
    id: 1,
    bookTitle: "Clean Architecture",
    bookAuthor: "Robert C. Martin",
    coverImageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400",
    reservedDate: "2026-07-08",
    status: "PENDING",
    bookId: "B-1042",
    queuePosition: 2
  },
  {
    id: 2,
    bookTitle: "Effective Java",
    bookAuthor: "Joshua Bloch",
    coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    reservedDate: "2026-07-01",
    status: "AVAILABLE",
    bookId: "B-2099",
    queuePosition: 0
  },
  {
    id: 3,
    bookTitle: "Spring Boot in Action",
    bookAuthor: "Craig Walls",
    coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
    reservedDate: "2026-06-15",
    status: "FULFILLED",
    bookId: "B-3011",
    queuePosition: 0
  }
];

const tabs = [
  { id: 'ALL', label: 'All Reservations' },
  { id: 'PENDING', label: 'Pending (In Queue)' },
  { id: 'AVAILABLE', label: 'Ready to Pickup' },
  { id: 'FULFILLED', label: 'Fulfilled' },
  { id: 'CANCELLED', label: 'Cancelled' }
];

const MyReservations = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [reservations, setReservations] = useState(mockReservations);
  const [loading, setLoading] = useState(false);

  /* ==========================================
     API CALL (Commented out for now)
     ==========================================
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        let url = '/api/reservations/user';
        if (activeTab !== 'ALL') url += `?status=${activeTab}`;
        // const response = await api.get(url);
        // setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [activeTab]);
  */

  const filteredReservations = activeTab === 'ALL' 
    ? reservations 
    : reservations.filter(res => res.status === activeTab);

  const getStatusConfig = (status) => {
    switch(status?.toUpperCase()) {
      case 'PENDING':
        return { gradient: 'from-yellow-100 to-yellow-200', textColor: 'text-yellow-800', icon: <HourglassBottom sx={{ fontSize: 18 }} /> };
      case 'AVAILABLE':
        return { gradient: 'from-green-100 to-green-200', textColor: 'text-green-800', icon: <CalendarMonth sx={{ fontSize: 18 }} /> };
      case 'FULFILLED':
        return { gradient: 'from-blue-100 to-blue-200', textColor: 'text-blue-800', icon: <CheckCircle sx={{ fontSize: 18 }} /> };
      case 'CANCELLED':
        return { gradient: 'from-red-100 to-red-200', textColor: 'text-red-800', icon: <Cancel sx={{ fontSize: 18 }} /> };
      default:
        return { gradient: 'from-gray-100 to-gray-200', textColor: 'text-gray-800', icon: <AccessAlarm sx={{ fontSize: 18 }} /> };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <EventAvailable sx={{ color: 'white', fontSize: 28 }} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Reservations</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-16">
            Track your requested books, queue positions, and pickup availability.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto custom-scrollbar border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-semibold transition-all duration-200 border-b-2 outline-none ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64"><CircularProgress sx={{ color: '#4F46E5' }} /></div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <EventAvailable sx={{ fontSize: 64, color: '#E5E7EB', mb: 2 }} />
            <h3 className="text-xl font-bold text-gray-900 mb-1">No Reservations Found</h3>
            <p className="text-gray-500">You don't have any book reservations matching this status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReservations.map((res) => {
              const statusConfig = getStatusConfig(res.status);
              return (
                <div key={res.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                  
                  <div className={`px-4 py-2 bg-gradient-to-br ${statusConfig.gradient} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className={`${statusConfig.textColor}`}>{statusConfig.icon}</span>
                      <span className={`font-bold text-sm uppercase tracking-wider ${statusConfig.textColor}`}>
                        {res.status}
                      </span>
                    </div>
                    {res.status === 'PENDING' && (
                      <span className="text-xs font-bold text-yellow-800 bg-yellow-200/50 px-2 py-1 rounded-full">
                        Queue #{res.queuePosition}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-grow">
                    <div className="flex gap-4">
                      <img src={res.coverImageUrl} alt={res.bookTitle} className="w-20 h-28 rounded-lg shadow-sm object-cover" />
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">{res.bookTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">{res.bookAuthor}</p>
                        <p className="text-xs text-gray-400 font-mono">ID: {res.bookId}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                      Reserved on: <span className="font-medium text-gray-900">{new Date(res.reservedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 mt-auto">
                    {res.status !== 'FULFILLED' && res.status !== 'CANCELLED' && (
                      <Button variant="outlined" color="error" size="small">
                        Cancel
                      </Button>
                    )}
                    {res.status === 'AVAILABLE' && (
                      <Button variant="contained" sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }} size="small">
                        Confirm Pickup
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;