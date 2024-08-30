import React, { useState } from 'react';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccommodationCard from './AccommodationCard';

const accommodations = [
  {
    id: 1,
    title: 'Madhur',
    address: 'Madhurkunj',
    price: '₹5000/month',
  },
  {
    id: 2,
    title: 'Om',
    address: 'Madhurkunj',
    price: '₹4500/month',
  },
  {
    id: 3,
    title: '14/4',
    address: 'Madhurkunj',
    price: '₹6500/month',
  },
  {
    id: 4,
    title: 'Kushal',
    address: 'Sbi nagar',
    price: '₹5500/month',
  },
  {
    id: 5,
    title: 'Atharva',
    address: 'panchwati rd',
    price: '₹4500/month',
  },
  {
    id: 6,
    title: 'Santosh',
    address: 'somewhere',
    price: '₹4500/month',
  },
];

const AccommodationPage = () => {
  const [maxPrice, setMaxPrice] = useState('');

  const filteredAccommodations = accommodations.filter((accommodation) => {
    const price = parseInt(accommodation.price.replace('₹', '').replace('/month', ''));
    return !maxPrice || price <= maxPrice;
  });

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid className="relative" item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid item lg={9} xs={12}>
          <Container>
            <Typography variant="h4" component="h1" gutterBottom>
              Nearby PGs and Rooms
            </Typography>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={8}>
                <TextField
                  label="Max Price"
                  variant="outlined"
                  fullWidth
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  sx={{
                    height: '56px',
                  }}
                  InputProps={{
                    sx: {
                      height: '56px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    height: '56px',
                  }}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {filteredAccommodations.map((accommodation) => (
                <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
                  <AccommodationCard
                    title={accommodation.title}
                    address={accommodation.address}
                    price={accommodation.price}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccommodationPage;
