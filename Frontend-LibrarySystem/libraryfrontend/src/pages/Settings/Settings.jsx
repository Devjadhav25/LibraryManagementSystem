import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications';
import Security from '@mui/icons-material/Security';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Switch, FormControlLabel, TextField, Button, Divider, Alert } from '@mui/material';

const Settings = () => {
  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    dueReminders: true,
    reservationUpdates: true,
    newsletter: false
  });

  // Password Update State
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [passwordStatus, setPasswordStatus] = useState(null); // 'success' or 'error'

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked
    });
    // Optional: Call API immediately to save preference
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPasswordStatus('error');
      return;
    }
    
    /* ==========================================
       API CALL FOR PASSWORD UPDATE
       ==========================================
    try {
      // await api.post('/api/users/change-password', {
      //   currentPassword: passwords.current,
      //   newPassword: passwords.new
      // });
      setPasswordStatus('success');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      setPasswordStatus('error');
    }
    */
    
    // Mock Success
    setPasswordStatus('success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-lg">
              <SettingsIcon sx={{ color: 'white', fontSize: 28 }} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Account <span className="text-gray-500">Settings</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-16">Configure your preferences and security options.</p>
        </div>

        <div className="space-y-6">
          
          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Notifications sx={{ color: '#4F46E5' }} />
              <h2 className="text-xl font-bold text-gray-900">Email Notifications</h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <FormControlLabel 
                control={<Switch checked={notifications.dueReminders} onChange={handleNotificationChange} name="dueReminders" color="primary" />} 
                label={<div><p className="font-semibold text-gray-900">Due Date Reminders</p><p className="text-sm text-gray-500">Get notified 2 days before a book is due.</p></div>}
              />
              <Divider />
              <FormControlLabel 
                control={<Switch checked={notifications.reservationUpdates} onChange={handleNotificationChange} name="reservationUpdates" color="primary" />} 
                label={<div><p className="font-semibold text-gray-900">Reservation Updates</p><p className="text-sm text-gray-500">Get notified when a reserved book is ready for pickup.</p></div>}
              />
              <Divider />
              <FormControlLabel 
                control={<Switch checked={notifications.newsletter} onChange={handleNotificationChange} name="newsletter" color="primary" />} 
                label={<div><p className="font-semibold text-gray-900">Library Newsletter</p><p className="text-sm text-gray-500">Receive monthly updates about new arrivals and events.</p></div>}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Security sx={{ color: '#10B981' }} />
              <h2 className="text-xl font-bold text-gray-900">Security & Password</h2>
            </div>
            <div className="p-6">
              {passwordStatus === 'success' && <Alert severity="success" sx={{ mb: 4 }}>Password updated successfully!</Alert>}
              {passwordStatus === 'error' && <Alert severity="error" sx={{ mb: 4 }}>Error updating password. Ensure they match.</Alert>}
              
              <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                <TextField 
                  fullWidth type="password" label="Current Password" variant="outlined" size="small"
                  value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} required
                />
                <TextField 
                  fullWidth type="password" label="New Password" variant="outlined" size="small"
                  value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} required
                />
                <TextField 
                  fullWidth type="password" label="Confirm New Password" variant="outlined" size="small"
                  value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} required
                />
                <Button type="submit" variant="contained" sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }}>
                  Update Password
                </Button>
              </form>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-100 bg-red-50 flex items-center gap-2">
              <DeleteForever sx={{ color: '#EF4444' }} />
              <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="outlined" color="error">
                Delete Account
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;