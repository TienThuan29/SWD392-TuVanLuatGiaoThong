import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledCard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#c9aaff' }}>A</Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Header"
        subheader="Subhead"
      />
      <CardMedia
        component="div"
        sx={{
          height: 140,
          backgroundColor: '#f2e9fc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#aaa',
          fontSize: 24,
        }}
      >
        {/* Placeholder content */}
        Image Placeholder
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div">
          Title
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Subtitle
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">Label</Button>
        <Button size="small" variant="contained" color="secondary">Label</Button>
      </CardActions>
    </Card>
  );
};

export default StyledCard;
