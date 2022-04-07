
import React from "react";
import ResponsiveAppBar from "../components/Navbar.js";
import {Copyright} from "../components/Copyright.js";

import SingleJob from "../components/SingleJob.js";

import { Grid, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { RootDiv, Main } from "../styles/JobsStyled.js";


function Job() {
  const { id } = useParams();
  return (
    <RootDiv>
      {/*<ResponsiveAppBar/>*/}
      <Container style = {{marginTop: 20}}>
        <Main>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <SingleJob id={id}/>
          </Grid>
          <Box pt={4}>
            <Copyright/>
          </Box>
        </Main>
      </Container>
    </RootDiv>
  );
}


export default Job;
