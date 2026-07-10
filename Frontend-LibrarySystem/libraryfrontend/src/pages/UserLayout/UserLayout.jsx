import React from 'react'
import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router'
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
    
const drawerWidth = 280;
const UserLayout = () => {
  // A simple function to pass to the Navbar so the mobile menu icon works without errors
const handleDrawerToggle = () => {
    console.log("Toggle mobile drawer");
};


  return (
    <Box  sx={{ display: 'flex', minHeight: '100vh' , backgroundColor: 'white'}}>
        {/* app barr */}
        <Navbar handleDrawerToggle={handleDrawerToggle} />

        {/* profile menu */}

         {/* side bar */}
         <UserSidebar/>

        {/* main content */}

        <Box component="main" sx={{ flexGrow: 1, width: {md: `calc(100% - ${drawerWidth}px)` },minHeight: '100vh' }}>
           <Toolbar />
           <Box>
            <Outlet />
           </Box>

        </Box>
    </Box>
  )

};

export default UserLayout
