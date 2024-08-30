import { Card, Grid } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MiddlePart from "./MiddlePart";
import HomeRight from "../../components/HomeRight/HomeRight";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import CreatePostModal from "../../components/CreatePost/CreatePostModal";
import { useSelector } from "react-redux";
import Authentication from "../Authentication/Authentication";

const HomePage = () => {
  const location = useLocation();
  console.log("location", location);
  const {auth}=useSelector(store=>store)

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid className="relative " item xs={0} lg={3}>
          <div className="sticky top-0 ">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          className="px-5 flex justify-center "
          item
          lg={location.pathname === "/" ? 6 : 9}
          xs={12}
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>
        {(location.pathname === "/" ) && (
          <Grid className="relative " item lg={3}>
            <div className="sticky top-0  w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
      <CreatePostModal/>
    </div>
  );
};

export default HomePage;
