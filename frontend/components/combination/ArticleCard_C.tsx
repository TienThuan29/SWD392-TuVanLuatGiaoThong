import React from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const ArticleCard: React.FC = () => {
  return (
    <Grid container spacing={4}>
      {[1, 2].map((item) => (
        <Grid item xs={12} md={6} key={item}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="div"
              sx={{
                height: 200,
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#aaa',
                fontSize: 24,
              }}
            >
              Image Placeholder
            </CardMedia>
            <CardContent>
              <Typography variant="h6" component="div">
                Heading
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Subheading
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipiscing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power parlour Melbourne occaecat discerning.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleCard;
