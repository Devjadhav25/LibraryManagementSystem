import React from 'react';
import StatesCard from './StatesCard';
import { Card, CardContent, LinearProgress, Tabs } from '@mui/material';
// 1. Import the missing icon here
import { AutoAwesome, BorderBottom, LibraryBooks } from '@mui/icons-material';
import { statsConfig } from './StateConfig';
import { Box, Tab } from '@mui/material';
import CurrentLoans from './CurrentLoans';
import Reservation from './Reservation';
import ReadingHistory from './ReadingHistory';
import Recommendations from './Recommendation';

const Dashboard = () => {

  const [activeTab, setActiveTab] = React.useState(0);

  const hanldeTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const stateData = statsConfig({ myLoans: [1,2,3], reservations: [1,2], stats: { readingStreak: 5 } });
  
  return (
    // Fixed Tailwind gradient syntax (to-purple-500)
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-500 py-8'>
      <div className=' px-4 sm:px-6 lg:px-8'>
        <div className="mb-8 animate-fade-in-up">
          <h1 className='text-4xl font-bold text-indigo-500 mb-2'>My {" "}
            <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Dashboard</span>
          </h1>
          <p>Track your reading journey and manage your library collection</p>
        </div>
        
        {/* FIX 1: Added mb-8 here to prevent overlapping with the Reading Goal card */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
            { stateData.map((item) => (
              <StatesCard
                key={item.id}
                bgColor={item.bgColor}
                textColor={item.textColor}
                icon={item.icon}
                value={item.value}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
        </div>

        {/* Reading Program */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1"> 2025 Reading Goal</h3>
            <p className="text-gray-600 ">{25} of 30 books read</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full ">
              <AutoAwesome sx={{ color: '#4F46E5', fontSize: 32 }} />
            </div>
          </div>

          {/* FIX 2: Fixed invalid hex color and changed background CSS for gradient support */}
          <LinearProgress 
            variant="determinate" 
            value={30} 
            sx={{ 
              height: 12, 
              borderRadius: 6, 
              backgroundColor: '#E0E7FF', 
              "& .MuiLinearProgress-bar": { 
                background: 'linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)', 
                borderRadius: 6 
              } 
            }} 
          />
          <p className="text-sm text-gray-600 mt-2">70%</p>
        </div>

        <div>
          {/* Tab Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* FIX 3: Changed BorderBottom to borderBottom */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    // FIX 4: Removed space to properly target the selected tab
                    "&.Mui-selected": {
                      color: "#4F46E5",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#4F46E5",
                  },
                }}
                value={activeTab} 
                onChange={hanldeTabChange} 
                aria-label="basic tabs example"
              >
                <Tab label="Current Loans" />
                <Tab label="Reservations" />
                <Tab label="Reading History" />
                <Tab label="Recommendations" />
              </Tabs>
            </Box>
            
            {/* FIX 5: Added p-6 wrapper to give the content breathing room so it's not touching the edge */}
            <div className="p-6">
              {/* current loans tab */}
              {activeTab === 0 && <CurrentLoans />}
              {/* reservations tab */}
              {activeTab === 1 && <Reservation />}
              {/* reading history tab */}
              {activeTab === 2 && <ReadingHistory />}
              {/* recommendations tab */}
              {activeTab === 3 && <Recommendations />}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;