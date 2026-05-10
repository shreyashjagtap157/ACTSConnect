import logo from './logo.svg';
import './App.css';
import Routers from './Routes/Routers';
import HomePage from './pages/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import MessagePage from './pages/Message/MessagePage';
import Authentication from './pages/Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from './Redux/Auth/auth.action';
import PasswordChangeSuccess from './pages/Authentication/PasswordChangeSuccess';
import VideoCall from './components/Message/VideoCall';
import Demo from './pages/Message/Demo';
import VideoCalling from './components/Message/VideoCalling';
import AccommodationPage from './pages/Accomodation/AccommodationPage';
import darkTheme from './theam/darkTheme';
import { ThemeProvider } from '@mui/material';
import MeetTheTeam from './pages/MeetTheTeam/MeetTheTeam';
import ViewJobPosting from './pages/Jobs/AddJobPosting';
import { Pages } from '@mui/icons-material';
import AddJobPosting from './pages/Jobs/ViewJobPostings';
import FindPeoplePage from './pages/FindPeople/FindPeoplePage';
import TokenExpiredHandler from './components/TokenExpiredHandler';
function App() {
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)

  useEffect(()=>{
    // Always attempt to fetch the user profile on load.
    // The backend will reject the request if the HttpOnly cookie is missing or invalid.
    dispatch(getUserProfile())
  },[dispatch])

  return (
    <ThemeProvider theme={darkTheme}>
      <TokenExpiredHandler />
      <Routes>
        <Route path='/*' element={auth.user? <HomePage/>:<Authentication/>}/>
        <Route path="/messages" element={<MessagePage/>} />
        <Route path="/accommodation" element={<AccommodationPage />} />
        <Route path="/password-change-success" element={<PasswordChangeSuccess/>} />
        <Route path='/video-call' element={<VideoCall/>}/>
        <Route path='/demo' element={<Demo/>}/>
        <Route path='/video-calling' element={<VideoCalling/>}/>
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="/view-job" element={<ViewJobPosting />} />
        <Route path="/add-job" element={<AddJobPosting />} />
        <Route path="/find-people" element={<FindPeoplePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
