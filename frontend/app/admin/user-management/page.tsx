"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HeaderTop_C from '@/components/combination/HeaderTop_C';
import Footer_C from '@/components/combination/Footer_C';
import { sampleUser } from '@/data/sample';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import AdminSidebar from '../components/AdminSidebar_C';

// Update interface to match the backend User model
interface User {
  id: number;
  email: string;
  fullname: string;
  // avatarUrl?: string;
  role: string;
  isEnable: boolean;
  createdAt: string; // Thêm trường ngày tạo
}

const usersData: User[] = [
  { id: 1, fullname: 'Alice Johnson', email: 'alice@example.com', role: 'ADMIN', isEnable: true, createdAt: '2024-01-01' },
  { id: 2, fullname: 'Bob Smith', email: 'bob@example.com', role: 'USER', isEnable: true, createdAt: '2024-02-15' },
  { id: 3, fullname: 'Charlie Lee', email: 'charlie@example.com', role: 'USER', isEnable: false, createdAt: '2024-03-10' },
];

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? selectedUser : u
        )
      );
    }
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderTop_C logedUser={sampleUser} />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box component="main" sx={{ flexGrow: 1, p: 4, width: '100%' }}>
            <Container maxWidth="xl">
              <Typography variant="h4" gutterBottom fontWeight={'bold'}>
                Quản lý Người Dùng
              </Typography>
              <Toolbar sx={{ justifyContent: 'space-between', paddingX: 0 }}>
                <TextField label="Tìm kiếm" variant="outlined" size="small" />
                <Button variant="contained" color="primary">
                  Điều chỉnh
                </Button>
              </Toolbar>
              <TableContainer
                component={Paper}
                sx={{
                  marginTop: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  boxShadow: 'none'
                }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Tên người dùng</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Vai trò</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.fullname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              color: user.isEnable ? 'red' : 'green',
                              fontWeight: 'bold'
                            }}
                          >
                            {user.isEnable ? 'Bị Khóa' : 'Hoạt động'}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" onClick={() => handleEditClick(user)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </Box>
        <Footer_C />

        {/* Edit User Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
          <DialogContent>
            <TextField
              label="Tên người dùng"
              fullWidth
              sx={{ mt: 2 }}
              value={selectedUser?.fullname || ''}
              onChange={(e) =>
                setSelectedUser((prev) =>
                  prev ? { ...prev, fullname: e.target.value } : prev
                )
              }
            />
            <TextField
              label="Email"
              fullWidth
              sx={{ mt: 2 }}
              value={selectedUser?.email || ''}
              onChange={(e) =>
                setSelectedUser((prev) =>
                  prev ? { ...prev, email: e.target.value } : prev
                )
              }
            />
            <TextField
              label="Ngày tạo"
              fullWidth
              sx={{ mt: 2 }}
              value={selectedUser?.createdAt || ''}
              onChange={(e) =>
                setSelectedUser((prev) =>
                  prev ? { ...prev, createdAt: e.target.value } : prev
                )
              }
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-label">Vai trò</InputLabel>
              <Select
                labelId="role-label"
                value={selectedUser?.role || ''}
                label="Vai trò"
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, role: e.target.value as string } : prev
                  )
                }
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <Typography>Trạng thái:</Typography>
              <Switch
                checked={selectedUser?.isEnable || false}
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, isEnable: e.target.checked } : prev
                  )
                }
                sx={{ ml: 1 }}
              />
              <Typography sx={{ ml: 1 }}>
                {selectedUser?.isEnable ? 'Bị Khóa' : 'Hoạt động'}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSave} variant="contained">Lưu</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserManagementPage;