import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 220;

const AdminSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#22223b', color: '#fff' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>ADMIN DASHBOARD</Typography>
      </Toolbar>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={pathname.includes('/admin/law-management')}
              onClick={() => router.push('/admin/law-management')}
              sx={{ color: '#fff' }}
            >
              <ListItemIcon sx={{ color: '#fff' }}><GavelIcon /></ListItemIcon>
              <ListItemText primary="Quản lý Luật" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={pathname.includes('/admin/user-management')}
              onClick={() => router.push('/admin/user-management')}
              sx={{ color: '#fff' }}
            >
              <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Quản lý Người Dùng" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;