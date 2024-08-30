import React from "react";
import { Grid, Card, Avatar, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Anurag",
    role: "Founder",
    image: "/1 (4).jpeg",
  },
  {
    name: "Kaustab",
    role: "Founder",
    image: "1 (3).jpeg",
  },
  {
    name: "Aditya",
    role: "Founder",
    image: "1 (5).jpeg",
  },
  {
    name: "Shreyash",
    role: "Founder",
    image: "1 (6).jpeg",
  },
  {
    name: "Lokesh",
    role: "Founder",
    image: "1 (2).jpeg",
  },
  {
    name: "Abhishek",
    role: "Founder",
    image: "1 (1).jpeg",
  },
];

const MeetTheTeam = () => {
  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid className="relative" item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={12} lg={9}>
          <div className="px-5 py-10">
            <Typography variant="h4" className="text-center mb-10">
              Meet The Team
            </Typography>
            <br></br>
            <br></br>
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <Link
                    to={`/profile/${member.name.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        p: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: 250,
                        height: 250,
                      }}
                    >
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{ width: 120, height: 120, mb: 2 }}
                      />
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {member.role}
                      </Typography>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MeetTheTeam;
