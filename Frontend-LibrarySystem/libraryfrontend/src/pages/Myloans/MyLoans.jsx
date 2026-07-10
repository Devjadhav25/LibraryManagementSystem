import React, { useState, useEffect } from 'react';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import { CircularProgress } from '@mui/material';
import LoanCard from './LoanCard';

// Dummy data mirroring the expected backend response
const mockLoans = [
  {
    id: 1,
    bookTitle: "Clean Code",
    bookAuthor: "Robert C. Martin",
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
    isbn: "978-0-13-235088-4",
    checkoutDate: "2026-07-01",
    dueDate: "2026-07-15",
    returnDate: null,
    status: "ACTIVE",
    note: null
  },
  {
    id: 2,
    bookTitle: "Designing Data-Intensive Applications",
    bookAuthor: "Martin Kleppmann",
    coverImageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=400",
    isbn: "978-1-4493-7332-0",
    checkoutDate: "2026-06-10",
    dueDate: "2026-06-24",
    returnDate: null,
    status: "OVERDUE",
    note: "Please return ASAP to avoid further fines."
  },
  {
    id: 3,
    bookTitle: "Effective Java",
    bookAuthor: "Joshua Bloch",
    coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    isbn: "978-0-13-468599-1",
    checkoutDate: "2026-05-01",
    dueDate: "2026-05-15",
    returnDate: "2026-05-12",
    status: "RETURNED",
    note: null
  }
];

const tabs = [
  { id: 'ALL', label: 'All' },
  { id: 'ACTIVE', label: 'Active' },
  { id: 'OVERDUE', label: 'Overdue' },
  { id: 'RETURNED', label: 'Returned' },
  { id: 'LOST', label: 'Lost' },
  { id: 'DAMAGED', label: 'Damaged' },
];

const MyLoans = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [loans, setLoans] = useState(mockLoans);
  const [loading, setLoading] = useState(false);

  /* ==========================================
     API CALL (Commented out for now)
     ==========================================
  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        // Build URL based on active tab filter
        let url = '/api/loans/user';
        if (activeTab !== 'ALL') {
          url += `?status=${activeTab}`;
        }
        
        // const response = await api.get(url);
        // setLoans(response.data);
      } catch (error) {
        console.error("Failed to fetch loans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [activeTab]); 
  */

  // Client-side filtering (Use this while using mock data)
  const filteredLoans = activeTab === 'ALL' 
    ? loans 
    : loans.filter(loan => loan.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <LibraryBooks sx={{ color: 'white', fontSize: 28 }} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Borrowed Books</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-16">
            Manage your book loans, track due dates, and renew books.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto custom-scrollbar border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] py-4 px-6 text-sm font-semibold transition-all duration-200 border-b-2 outline-none ${
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

        {/* Loans Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress sx={{ color: '#4F46E5' }} />
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <LibraryBooks sx={{ fontSize: 64, color: '#E5E7EB', mb: 2 }} />
            <h3 className="text-xl font-bold text-gray-900 mb-1">No Loans Found</h3>
            <p className="text-gray-500">You don't have any books matching this status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyLoans;