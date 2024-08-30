import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AccommodationCard = ({ title, address, price }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;
