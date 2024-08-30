import { Avatar } from '@mui/material';
import React from 'react';

const PopularUserCard = ({ image, username, description, onClick }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <Avatar
          sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }}
          className='w-9 h-9 rounded-full'
          src={image}
          alt={username}
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        />
        <div className='ml-2'>
          <p
            className='text-sm font-semibold cursor-pointer'
            onClick={onClick}
          >
            {username}
          </p>
          <p className='text-sm font-semibold opacity-70'>{description}</p>
        </div>
      </div>
      <p
        className='text-blue-700 text-sm font-semibold cursor-pointer'
        onClick={onClick}
      >
        Follow
      </p>
    </div>
  );
};

export default PopularUserCard;