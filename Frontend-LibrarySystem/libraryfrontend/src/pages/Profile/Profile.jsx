import React, { useState, useEffect } from 'react';
import Person from '@mui/icons-material/Person';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import Close from '@mui/icons-material/Close';
import { Button, TextField, Avatar, CircularProgress, Divider } from '@mui/material';

// Mock Data
const mockProfile = {
  id: 1,
  fullName: "Rock ",
  email: "rock10@gmail.com",
  phone: "+91 9876543210",
  role: "ROLE_USER",
  createdAt: "2025-10-25T10:37:00",
  lastLogin: "2026-07-10T09:15:00",
  stats: {
    booksRead: 25,
    activeLoans: 3,
    finesPaid: "₹150"
  }
};

const Profile = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for editing
  const [formData, setFormData] = useState({
    fullName: "",
    phone: ""
  });

  /* ==========================================
     API CALL (Commented out for now)
     ==========================================
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // const response = await api.get('/api/users/profile');
        // setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  */

  // Initialize form data when editing starts
  const handleEditClick = () => {
    setFormData({
      fullName: profile.fullName,
      phone: profile.phone || ""
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    /* ==========================================
       API SAVE CALL
       ==========================================
    try {
      // await api.put('/api/users/profile', formData);
      // setProfile({ ...profile, ...formData });
      // setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    */
    
    // Optimistic UI update for mock data
    setProfile({ ...profile, ...formData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Person sx={{ color: 'white', fontSize: 28 }} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profile</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-16">Manage your personal information and view account stats.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64"><CircularProgress sx={{ color: '#4F46E5' }} /></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Top Banner & Avatar */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="px-6 sm:px-10 pb-8 relative">
              <div className="flex justify-between items-end -mt-12 mb-6">
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    border: '4px solid white', 
                    bgcolor: '#1e293b', 
                    fontSize: '2.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                  }}
                >
                  {profile.fullName.charAt(0)}
                </Avatar>
                
                {!isEditing ? (
                  <Button 
                    variant="outlined" 
                    startIcon={<Edit />} 
                    onClick={handleEditClick}
                    sx={{ borderColor: '#E5E7EB', color: '#374151', bgcolor: 'white' }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outlined" color="error" startIcon={<Close />} onClick={handleCancelEdit} sx={{ bgcolor: 'white' }}>
                      Cancel
                    </Button>
                    <Button variant="contained" startIcon={<Save />} onClick={handleSaveProfile} sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }}>
                      Save
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Form / Info */}
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-1"><Person fontSize="small" /> Full Name</p>
                    {isEditing ? (
                      <TextField 
                        fullWidth 
                        size="small" 
                        value={formData.fullName} 
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                      />
                    ) : (
                      <p className="text-lg font-bold text-gray-900">{profile.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-1"><Email fontSize="small" /> Email Address</p>
                    <p className="text-lg font-medium text-gray-700">{profile.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">*Email cannot be changed.</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-1"><Phone fontSize="small" /> Phone Number</p>
                    {isEditing ? (
                      <TextField 
                        fullWidth 
                        size="small" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-700">{profile.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Right Column: Account Meta */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
                  <h3 className="font-bold text-gray-900 mb-4">Account Overview</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center gap-2"><CalendarToday fontSize="small" /> Member Since</span>
                      <span className="font-semibold text-gray-900">{new Date(profile.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Books Read</span>
                      <span className="font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{profile.stats.booksRead}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Role</span>
                      <span className="font-semibold text-gray-900">{profile.role.replace('ROLE_', '')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;