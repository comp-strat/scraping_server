
import React, {Component} from "react";
import {LeftDrawer} from "../components/LeftDrawer.js";
import ResponsiveAppBar from "../components/Navbar.js";
import {Copyright} from "../components/Copyright";

import SingleJob from "../components/SingleJob.js"

import { Grid, Box, Container} from '@material-ui/core';
import { useParams } from 'react-router-dom'
import {jobsStyles} from "../styles/jobsStyles";

const classes = jobsStyles;

function Job(props) {
    const { id } = useParams()
    return (
        <div className={classes.root}>
            <ResponsiveAppBar/>
            <Container style = {{marginTop: 20}}>
            <main className={classes.main}>
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
            </main>
            </Container>
        </div>
    )
}


export default Job;
