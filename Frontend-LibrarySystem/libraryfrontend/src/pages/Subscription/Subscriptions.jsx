import React, { useState, useEffect } from 'react';
import CardMembership from '@mui/icons-material/CardMembership';
import WorkspacePremium from '@mui/icons-material/WorkspacePremium';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Star from '@mui/icons-material/Star';
import { Button, CircularProgress, Chip } from '@mui/material';

// Mock Data
const mockCurrentSubscription = {
  id: 1,
  planName: "Standard Reader",
  status: "ACTIVE",
  expiryDate: "2026-12-31",
  maxBooksAllowed: 3,
  price: 500,
  currency: "INR"
};

const mockAvailablePlans = [
  {
    id: 101,
    planName: "Basic Reader",
    price: 200,
    currency: "INR",
    durationDays: 30,
    maxBooksAllowed: 1,
    features: ["1 Book at a time", "Standard Support", "7-day borrow period"]
  },
  {
    id: 102,
    planName: "Standard Reader",
    price: 500,
    currency: "INR",
    durationDays: 30,
    maxBooksAllowed: 3,
    isCurrent: true,
    features: ["3 Books at a time", "Priority Support", "14-day borrow period"]
  },
  {
    id: 103,
    planName: "Premium Scholar",
    price: 1200,
    currency: "INR",
    durationDays: 30,
    maxBooksAllowed: 10,
    isPopular: true,
    features: ["10 Books at a time", "24/7 Dedicated Support", "30-day borrow period", "Free Home Delivery"]
  }
];

const Subscriptions = () => {
  const [currentPlan, setCurrentPlan] = useState(mockCurrentSubscription);
  const [availablePlans, setAvailablePlans] = useState(mockAvailablePlans);
  const [loading, setLoading] = useState(false);

  /* ==========================================
     API CALL (Commented out for now)
     ==========================================
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      setLoading(true);
      try {
        // const currentRes = await api.get('/api/subscriptions/user/active');
        // setCurrentPlan(currentRes.data);
        
        // const plansRes = await api.get('/api/subscription-plans');
        // setAvailablePlans(plansRes.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptionData();
  }, []);
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <CardMembership sx={{ color: 'white', fontSize: 28 }} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Subscription</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-16">Manage your membership plan and upgrade for more perks.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64"><CircularProgress sx={{ color: '#4F46E5' }} /></div>
        ) : (
          <>
            {/* Current Active Plan Card */}
            {currentPlan && (
              <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full">
                    <WorkspacePremium sx={{ fontSize: 40 }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentPlan.planName}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Chip label="Active" color="success" size="small" sx={{ fontWeight: 'bold' }} />
                      <span className="text-sm text-gray-500">
                        Expires on: {new Date(currentPlan.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outlined" color="error" fullWidth sx={{ md: { width: 'auto' } }}>
                    Cancel Plan
                  </Button>
                  <Button variant="contained" sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }} fullWidth>
                    Renew Now
                  </Button>
                </div>
              </div>
            )}

            {/* Available Plans Grid */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Available Plans</h3>
              <p className="text-gray-500">Choose the perfect reading tier for you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {availablePlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative bg-white rounded-2xl shadow-sm border p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
                    plan.isPopular ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-50 scale-105 md:-translate-y-2' : 'border-gray-200'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Star sx={{ fontSize: 14 }} /> Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6 mt-4">
                    <h4 className="text-lg font-semibold text-gray-500">{plan.planName}</h4>
                    <div className="mt-2 flex justify-center items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-500 font-medium">/ mo</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle sx={{ color: '#10B981', fontSize: 20, flexShrink: 0 }} />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.isPopular ? 'contained' : 'outlined'}
                    disabled={plan.isCurrent}
                    sx={plan.isPopular 
                      ? { bgcolor: '#9333EA', '&:hover': { bgcolor: '#7E22CE' }, py: 1.5, fontWeight: 'bold' } 
                      : { py: 1.5, fontWeight: 'bold', borderColor: '#E5E7EB', color: '#374151' }
                    }
                    fullWidth
                  >
                    {plan.isCurrent ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;