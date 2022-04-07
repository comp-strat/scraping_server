import React, { Component } from "react";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

//Material UI
import {
  Grid, Typography, CardContent,
  IconButton, Box,
} from "@mui/material";

import {
  PeopleAlt, AssignmentTurnedInRounded,
  Notifications, Error, Done, Autorenew
} from "@mui/icons-material";


// recharts
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";


//Styles
import {
  StatCard, StatCardContent, largeIcon, largeButton, RightContainer, ChartPaper, Root, Main
} from "../styles/DashboardStyled";


function createUrlData(time, amount) {
  return { time, amount };
}

export const urlAmount = [
  createUrlData("03/23", 700),
  createUrlData("03/30", 900),
  createUrlData("04/06", 600),
  createUrlData("04/13", 1500),
  createUrlData("04/20", 1200),
  createUrlData("04/27", 2000),
  createUrlData("05/04", 400),
  createUrlData("05/11", 750),
  createUrlData("05/18", 1000),
];

export const progressData = [
  {
    status: "Progress",
    Completed: "300",
    Incompleted: "900",
  },
];


function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function Chart() {

  return (
    <React.Fragment>
      <Title>URL Scrapped</Title>
      <ResponsiveContainer>
        <LineChart
          data={urlAmount}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle"}}
            >
              Amount of URLs
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

function ProgressTracker() {
  return (
    <React.Fragment>
      <Title>Progress Tracker</Title>
      <ResponsiveContainer>
        <BarChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" fill="#0080FF" />
          <Bar dataKey="Incompleted" fill="#FF9933" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

function ClientNumber(props) {
  return (
    <StatCard variant="outlined">
      <StatCardContent>
        <IconButton style={largeButton} >
          <PeopleAlt style={largeIcon} />
        </IconButton>
      </StatCardContent>
      <CardContent>
        <Typography
          style={{fontSize: 30}}
          variant="h5" component="h2"
          align='center'
        >
          {props.number}
        </Typography>
        <Typography
          style={{fontSize: 12}}
          variant="body2" component="p"
          align='center'
        >
          {props.name}
        </Typography>
      </CardContent>
    </StatCard>
  );
}

function OverallCompletedNumber(props) {

  return (
    <StatCard variant="outlined">
      <StatCardContent>
        <IconButton style={largeButton}>
          <Done style={largeIcon} />
        </IconButton>
      </StatCardContent>
      <CardContent>
        <Typography
          style={{fontSize: 30}}
          variant="h5" component="h2"
          align='center'
        >
          {props.number}
        </Typography>
        <Typography
          style={{fontSize: 12}}
          variant="body2" component="p"
          align='center'
        >
          {props.name}
        </Typography>
      </CardContent>
    </StatCard>
  );
}

function JobNumber(props) {

  return (
    <StatCard variant="outlined">
      <StatCardContent>
        <IconButton style={largeButton}>
          <AssignmentTurnedInRounded style={largeIcon} />
        </IconButton>
      </StatCardContent>
      <CardContent>
        <Typography
          style={{fontSize: 30}}
          variant="h5" component="h2"
          align='center'
        >
          {props.number}
        </Typography>
        <Typography
          style={{fontSize: 12}}
          variant="body2" component="p"
          align='center'
        >
          {props.name}
        </Typography>
      </CardContent>
    </StatCard>
  );
}

function InProgressNumber(props) {

  return (
    <StatCard variant="outlined">
      <StatCardContent>
        <IconButton style={largeButton}>
          <Autorenew style={largeIcon} />
        </IconButton>
      </StatCardContent>
      <CardContent>
        <Typography
          style={{fontSize: 30}}
          variant="h5" component="h2"
          align='center'
        >
          {props.number}
        </Typography>
        <Typography
          style={{fontSize: 12}}
          variant="body2" component="p"
          align='center'
        >
          {props.name}
        </Typography>
      </CardContent>
    </StatCard>
  );
}

function NotificationNumber(props) {

  return (
    <StatCard variant="outlined">
      <StatCardContent>
        <IconButton style={largeButton}>
          <Notifications style={largeIcon} />
        </IconButton>
      </StatCardContent>
      <CardContent>
        <Typography
          style={{fontSize: 30}}
          variant="h5" component="h2"
          align='center'
        >
          {props.number}
        </Typography>
        <Typography
          style={{fontSize: 12}}
          variant="body2" component="p"
          align='center'
        >
          {props.name}
        </Typography>
      </CardContent>
    </StatCard>
  );
}

function ErrorNumber(props) {

  return (
    <StatCard variant="outlined">
      <StatCardContent>
        <IconButton style={largeButton}>
          <Error style={largeIcon} />
        </IconButton>
      </StatCardContent>
      <CardContent>
        <Typography
          style={{fontSize: 30}}
          variant="h5" component="h2"
          align='center'
        >
          {props.number}
        </Typography>
        <Typography
          style={{fontSize: 12}}
          variant="body2" component="p"
          align='center'
        >
          {props.name}
        </Typography>
      </CardContent>
    </StatCard>
  );
}

function BoardBody() {

  return (
    <RightContainer
      container
      item
      justify="space-between"
      alignItems="stretch"
      spacing={2}
      xs={12}
      lg={12}
      md={12}
    >
      <Grid
        container
        item
        justify="space-between"
        alignItems="stretch"
        spacing={2}
        xs={12}
        lg={12}
        md={12}
      >
        <Grid item xs={2}>
          <ClientNumber number='128' name='Clients' />
        </Grid>
        <Grid item xs={2}>
          <OverallCompletedNumber number='1142' name='Overall Completed' />
        </Grid>
        <Grid item xs={2}>
          <JobNumber number='32' name='Your Completed Jobs' />
        </Grid>
        <Grid item xs={2}>
          <InProgressNumber number='6' name='Jobs in Progress' />
        </Grid>
        <Grid item xs={2}>
          <NotificationNumber number='2' name='Notifications' />
        </Grid>
        <Grid item xs={2}>
          <ErrorNumber number='4' name='Errors' />
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={2}
        xs={12}
        lg={12}
        md={12}
      >
        <Grid
          item
          xs={8}
          lg={8}
          md={8}
        >
          <ChartPaper>
            <Chart />
          </ChartPaper>
        </Grid>
        <Grid
          item
          xs={4}
          lg={4}
          md={4}
        >
          <ChartPaper>
            <ProgressTracker />
          </ChartPaper>
        </Grid>
      </Grid>
    </RightContainer>
  );
}

function DashboardPage(props) {

  return (
    <Root>
      <LeftDrawer history={props.history}/>
      <Main>
        <BoardBody />
        <Box pt={4}>
          <Copyright />
        </Box>
      </Main>
    </Root>
  );
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DashboardPage history={this.props.history}/>
    );
  }
}

export default Dashboard;