import React, {Component} from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import HomeNavbar from "../components/HomeNavbar.js";
import Login from "../components/Login.js";
import Logout from "../components/Logout.js";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& video': {
      objectFit: 'cover',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    paddingBottom: theme.spacing(4),
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <img
      style = {{
        width:"100%",
        height:"100%"
      }}
      src = {"/static/img/Socratesacademy.jpg"}
      />
      <div className={classes.overlay}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography variant="h3" component="h1" className={classes.title}>
            Universal Web Crawler
          </Typography>
          <Typography variant="h5" component="h1" className={classes.title}>
            Simple Interface to Crawl Public Websites
          </Typography>
        </Box>
      </div>
    </section>
  );
};

function Home() {
  return (
    <div className="Home">
      <HomeNavbar/>
      <Hero/>
    </div>
  );
}

export default Home;
