import React from 'react';
import { AppBar, Typography, Toolbar, IconButton, Tooltip, Avatar , Box} from '@mui/material';
import { Contrast, Menu as MenuIcon, NotificationAdd, Notifications, Search} from '@mui/icons-material';
import { useLocation } from 'react-router';
import { navigationItems } from "./NavigationItems";
import { isActive } from './util';


const drawerWidth = 280;
const user={
  fullName : "Devesh Jadhav",
  profilePicture:"https://media.istockphoto.com/id/820317434/vector/male-profile-picture.jpg?s=2048x2048&w=is&k=20&c=BU0ysp_Vl3LjSjxUDdB4zviJNu_5mitOmnICytrZrpI="

}
const Navbar = ({ handleDrawerToggle }) => {
  const location = useLocation();

  return (
    <AppBar 
      position="fixed" 
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: "#ffffff", // Forces a solid white background
        color: "#1e293b", // Forces dark slate text so you can read it!
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)", // Makes the shadow clearly visible
        zIndex: 1100, // Forces the navbar to stay on top of the page content
      }}
    >
      <Toolbar>
        <IconButton 
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          {navigationItems.find((item) => isActive(item.path, location))?.title || "Dashboard"}
        </Typography>

        <Tooltip title="Search">
          <IconButton>
            <Search/>
          </IconButton>
        </Tooltip>

        <Notifications/>

        <Box sx={{ml:2}}>
          <Contrast/>
        </Box>

        <Tooltip title ="Account">
          <IconButton sx={{ml:1}}>
            <Avatar src ={user?.profilePicture}sx={{width:36, height:36}}>
              {user?.fullName?.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;