import { Card, Grid } from "@mui/material";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FindPeople from "./FindPeople";
import { useLocation } from "react-router-dom";

const FindPeoplePage = () => {
  const location = useLocation(); // Correctly define location

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid className="relative" item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          className="px-5 flex justify-center"
          item
          lg={location.pathname === "/" ? 6 : 9} // Correctly apply size logic
          xs={12}
        >
          <FindPeople />
        </Grid>
      </Grid>
    </div>
  );
};

export default FindPeoplePage;
