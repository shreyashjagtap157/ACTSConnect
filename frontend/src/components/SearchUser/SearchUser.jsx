import { Avatar, Card, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";

const SearchUser = ({ handleClick }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [username, setUsername] = useState("");
  const [searchError, setSearchError] = useState("");
  const handleSearchUser = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value.trim().length < 2) {
      setSearchError("Enter at least 2 characters to search.");
      return;
    }
    setSearchError("");
    dispatch(searchUser(value));
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full text-white px-5 py-3 rounded-full"
          type="text"
          placeholder="search user..."
          onChange={handleSearchUser}
        />
        {searchError && (
          <div className="absolute w-full z-10 top-[4.5rem] bg-white text-center py-2 text-red-600">{searchError}</div>
        )}
        {auth.loading && (
          <div className="absolute w-full z-10 top-[4.5rem] bg-white text-center py-2 text-blue-600">Searching...</div>
        )}
        {auth.error && (
          <div className="absolute w-full z-10 top-[4.5rem] bg-white text-center py-2 text-red-600">{auth.error}</div>
        )}
        {username && !auth.loading && !auth.error && !searchError && (
          <Card className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
            {auth.searchResult.map((item) => (
              <CardHeader
                key={item.id}
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={<Avatar src={item.image} />}
                title={item.firstName + " " + item.lastName}
                subheader={`@${
                  item.firstName.toLowerCase() +
                  "_" +
                  item.lastName.toLowerCase()
                }`}
              />
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
