import React, { useState, useEffect } from 'react';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import WarningAmber from '@mui/icons-material/WarningAmber';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Payment from '@mui/icons-material/Payment';
import { Button, CircularProgress } from '@mui/material';

const mockFines = [
  {
    id: 1,
    bookTitle: "Designing Data-Intensive Applications",
    fineReason: "OVERDUE",
    amount: 150, // Amount in INR/Cents depending on your backend
    currency: "INR",
    issueDate: "2026-06-25",
    paidDate: null,
    status: "UNPAID",
  },
  {
    id: 2,
    bookTitle: "Head First Java",
    fineReason: "DAMAGED_BOOK_PENALTY",
    amount: 500,
    currency: "INR",
    issueDate: "2026-05-10",
    paidDate: "2026-05-12",
    status: "PAID",
  }
];

const tabs = [
  { id: 'UNPAID', label: 'Unpaid Fines' },
  { id: 'PAID', label: 'Payment History' }
];

const MyFines = () => {
  const [activeTab, setActiveTab] = useState('UNPAID');
  const [fines, setFines] = useState(mockFines);
  const [loading, setLoading] = useState(false);

  /* ==========================================
     API CALL (Commented out for now)
     ==========================================
  useEffect(() => {
    const fetchFines = async () => {
      setLoading(true);
      try {
        let url = '/api/fines/user';
        if (activeTab !== 'ALL') url += `?status=${activeTab}`;
        // const response = await api.get(url);
        // setFines(response.data);
      } catch (error) {
        console.error("Error fetching fines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFines();
  }, [activeTab]);
  */

  const filteredFines = fines.filter(fine => fine.status === activeTab);
  
  // Quick calculations for the header
  const totalUnpaid = fines.filter(f => f.status === 'UNPAID').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
                <ReceiptLong sx={{ color: 'white', fontSize: 28 }} />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                My <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Fines</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 ml-16">View penalties and manage your library payments.</p>
          </div>
          
          {/* Quick Stat Card */}
          <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm min-w-[200px]">
            <p className="text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">Total Outstanding</p>
            <p className="text-3xl font-bold text-red-600">₹{totalUnpaid}</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 border-b-2 outline-none ${
                  activeTab === tab.id
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List View */}
        {loading ? (
          <div className="flex justify-center items-center h-64"><CircularProgress sx={{ color: '#EF4444' }} /></div>
        ) : filteredFines.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <CheckCircle sx={{ fontSize: 64, color: '#10B981', mb: 2 }} />
            <h3 className="text-xl font-bold text-gray-900 mb-1">All Clear!</h3>
            <p className="text-gray-500">You don't have any fines in this category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFines.map((fine) => (
              <div key={fine.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${fine.status === 'UNPAID' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {fine.status === 'UNPAID' ? <WarningAmber /> : <CheckCircle />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{fine.bookTitle}</h3>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Reason: <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 text-xs tracking-wider">{fine.fineReason.replace(/_/g, ' ')}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Issued: {new Date(fine.issueDate).toLocaleDateString()} 
                      {fine.paidDate && ` • Paid: ${new Date(fine.paidDate).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                  <div className={`text-2xl font-bold ${fine.status === 'UNPAID' ? 'text-red-600' : 'text-gray-900'}`}>
                    ₹{fine.amount}
                  </div>
                  {fine.status === 'UNPAID' && (
                    <Button 
                      variant="contained" 
                      startIcon={<Payment />} 
                      sx={{ bgcolor: '#EF4444', '&:hover': { bgcolor: '#DC2626' } }}
                      // onClick={() => initiatePayment(fine.id)} // Your Razorpay logic will go here
                    >
                      Pay Now
                    </Button>
                  )}
                  {fine.status === 'PAID' && (
                    <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Completed</span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFines;