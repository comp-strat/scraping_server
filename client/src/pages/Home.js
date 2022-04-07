import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import HomeNavbar from "../components/HomeNavbar.js";


const Root = styled("section")`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Overlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(4)
}));

const Hero = () => {
  return (
    <Root>
      <img
        style = {{
          width:"100%",
          height:"100%"
        }}
        src = {"/static/img/Socratesacademy.jpg"}
        alt={"Cover Image"}
      />
      <Overlay>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Header variant="h3" component="h1">
            Universal Web Crawler
          </Header>
          <Header variant="h5" component="h1">
            Simple Interface to Crawl Public Websites
          </Header>
        </Box>
      </Overlay>
    </Root>
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
