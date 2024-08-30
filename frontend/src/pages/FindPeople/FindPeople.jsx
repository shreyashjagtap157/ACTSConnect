import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import PopularUserCard from '../../components/HomeRight/PopularUserCard';
import axios from 'axios'; 
import SearchUser from '../../components/SearchUser/SearchUser'; 

const courses = ['DAC', 'DASSD', 'DMC', 'DVLSI', 'DESD', 'DIOT', 'DRAT', 'DUASP', 'DAI', 'DBDA', 'DHPCAP', 'DHPCSA', 'DITISS', 'DCSF', 'DFBD'];

const FindPeople = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedBatchYear, setSelectedBatchYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); 
        setUsers(response.data);
        setFilteredUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user search
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/search/users?query=${query}`); 
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      const filtered = users.filter(user => {
        const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesBatchYear = selectedBatchYear ? user.batchYear === selectedBatchYear : true;
        const matchesCourse = selectedCourse ? user.course === selectedCourse : true;
        return matchesName && matchesBatchYear && matchesCourse;
      });
      setFilteredUsers(filtered);
    };

    applyFilters();
  }, [searchName, selectedBatchYear, selectedCourse, users]);

  // Handle search input change
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    handleSearch(event.target.value); // Perform search
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
            <SearchUser handleClick={(userId) => console.log(`Clicked on user ${userId}`)} />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Optional: You can place other filters here if needed */}
          </Grid>
        </Grid>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <PopularUserCard
                    image={user.image}
                    username={user.name}
                    description={user.description}
                    onClick={() => console.log(`Clicked on user ${user.id}`)} 
                  />
                </Grid>
              ))
            ) : (
              filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <PopularUserCard
                    image={user.image}
                    username={user.name}
                    description={user.description}
                    onClick={() => console.log(`Clicked on user ${user.id}`)} 
                  />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default FindPeople;
