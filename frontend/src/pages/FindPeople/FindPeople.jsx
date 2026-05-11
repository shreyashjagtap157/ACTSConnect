import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import PopularUserCard from '../../components/HomeRight/PopularUserCard';
import axios from 'axios';
import { userApi } from '../../config/api';
import SearchUser from '../../components/SearchUser/SearchUser'; 

const courses = ['DAC', 'DASSD', 'DMC', 'DVLSI', 'DESD', 'DIOT', 'DRAT', 'DUASP', 'DAI', 'DBDA', 'DHPCAP', 'DHPCSA', 'DITISS', 'DCSF', 'DFBD'];

const FindPeople = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedBatchYear, setSelectedBatchYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchFilteredUsers = async () => {
      setIsLoading(true);
      try {
        const searchData = {
          name: searchName || null,
          minBatchYear: selectedBatchYear || null,
          maxBatchYear: selectedBatchYear || null,
          courseType: selectedCourse || null,
          company: null
        };
        const response = await userApi.searchUsers(searchData);
        // The backend now returns a List<UserResponseDTO> which contains image, name, company, courseType, etc.
        setFilteredUsers(response.data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchFilteredUsers();
  }, [searchName, selectedBatchYear, selectedCourse]);

  // Handle search input change
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  // Handle select changes
  const handleBatchYearChange = (event) => {
    setSelectedBatchYear(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  return (
    <div className="px-20">
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Find People
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <SearchUser handleClick={() => {}} />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Optional: You can place other filters here if needed */}
          </Grid>
        </Grid>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <PopularUserCard
                  image={user.profilePictureUrl}
                  username={user.name}
                  description={user.company || user.courseType || ''}
                  onClick={() => console.log(`Clicked on user ${user.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default FindPeople;
