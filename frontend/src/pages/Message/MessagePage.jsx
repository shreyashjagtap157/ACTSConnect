import { Grid } from "@mui/material";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Message from "./Message";
import { useLocation } from "react-router-dom";

const MessagePage = () => {
  const location = useLocation(); 

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
          lg={location.pathname === "/" ? 6 : 9} 
          xs={12}
        >
          <Message />
        </Grid>
      </Grid>
    </div>
  );
};

export default MessagePage;
