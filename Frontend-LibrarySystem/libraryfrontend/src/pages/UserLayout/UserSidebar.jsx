import { Box, Drawer } from '@mui/material';
import React from 'react'
import SidebarDrawer from './SidebarDrawer';

const drawerWidth = 280;
const UserSidebar = () => {
  return (
    <Box component={"nav"} sx= {{width:{md:drawerWidth},flexShrink:{md:0}}}  >
      
      {/* destop drawer */}
        <Drawer variant='permanent' open sx={{display:{xs:'none',md:'block'},"& .MuiDrawer-paper":{width:drawerWidth,boxSizing:"border-box", border:"none",}}}
        >
            <SidebarDrawer/>


            <Box sx={{overflow:"auto"}}> 

            </Box>

        </Drawer>
    </Box>
  )
}

export default UserSidebar
