import React from "react";
import PopularUserCard from "./PopularUserCard";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";

const popularUser = [
  { id: 1, image: 'https://source.unsplash.com/random/50x50?person', username: 'Anurag', description: 'Follows you' },
  { id: 2, image: 'https://source.unsplash.com/random/50x50?person', username: 'John', description: 'Follows you' },
  // Add more users as needed
];

const HomeRight = () => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="pr-5">
      <SearchUser handleClick={handleUserClick} />
      <div className="card p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>
        <div className="space-y-5">
          {popularUser.map((user) => (
            <PopularUserCard
              key={user.id}
              image={user.image}
              username={user.username}
              description={user.description}
              onClick={() => handleUserClick(user.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;