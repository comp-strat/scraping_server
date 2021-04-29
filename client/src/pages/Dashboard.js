import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import {LeftDrawer, Copyright} from '../components/Components.js'
import { makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ErrorIcon from '@material-ui/icons/Error';
import DoneIcon from '@material-ui/icons/Done';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Box from '@material-ui/core/Box';
import {urlAmount, progressData} from '../data/pesudoData.js'
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
} from 'recharts';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) =>({
  root: {
    display: 'flex',
  },

  statCard: {
    maxWidth: 300,
    maxHeight: 300
  },

  cardContent: {
    display:'flex',
    justifyContent:'center'
  },

  largeButton: {
    padding: 15
  },

  largeIcon: {
    fontSize: "3em"
  },

  chartPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 360,
  },

  rightContainer: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
  },

  main: {
    flexGrow: 1,
  }

}));

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function Chart(props) {

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
              style={{ textAnchor: 'middle'}}
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

function ProgressTracker(props) {
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
  const classes = useStyles();
  return (
    <Card className={classes.statCard} variant="outlined">
      <CardMedia className={classes.cardContent}>
        <IconButton className={classes.largeButton}>
          <PeopleAltIcon className={classes.largeIcon} />
        </IconButton>
      </CardMedia>
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
    </Card>
  );
}

function OverallCompletedNumber(props) {
  const classes = useStyles();
  return (
    <Card className={classes.statCard} variant="outlined">
      <CardMedia className={classes.cardContent}>
        <IconButton className={classes.largeButton}>
          <DoneIcon className={classes.largeIcon} />
        </IconButton>
      </CardMedia>
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
    </Card>
  );
}

function JobNumber(props) {
  const classes = useStyles();
  return (
    <Card className={classes.statCard} variant="outlined">
      <CardMedia className={classes.cardContent}>
        <IconButton className={classes.largeButton}>
          <AssignmentTurnedInRoundedIcon className={classes.largeIcon} />
        </IconButton>
      </CardMedia>
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
    </Card>
  );
}

function InProgressNumber(props) {
  const classes = useStyles();
  return (
    <Card className={classes.statCard} variant="outlined">
      <CardMedia className={classes.cardContent}>
        <IconButton className={classes.largeButton}>
          <AutorenewIcon className={classes.largeIcon} />
        </IconButton>
      </CardMedia>
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
    </Card>
  );
}

function NotificationNumber(props) {
  const classes = useStyles();
  return (
    <Card className={classes.statCard} variant="outlined">
      <CardMedia className={classes.cardContent}>
        <IconButton className={classes.largeButton}>
          <NotificationsIcon className={classes.largeIcon} />
        </IconButton>
      </CardMedia>
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
    </Card>
  );
}

function ErrorNumber(props) {
  const classes = useStyles();
  return (
    <Card className={classes.statCard} variant="outlined">
      <CardMedia className={classes.cardContent}>
        <IconButton className={classes.largeButton}>
          <ErrorIcon className={classes.largeIcon} />
        </IconButton>
      </CardMedia>
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
    </Card>
  );
}

function BoardBody(props) {
	const classes = useStyles();
	return (
    <Grid
      container
      item
      className={classes.rightContainer}
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
          <Paper className={classes.chartPaper}>
            <Chart />
          </Paper>
        </Grid>
        <Grid
          item
          xs={4}
          lg={4}
          md={4}
        >
          <Paper className={classes.chartPaper}>
            <ProgressTracker />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
	);
}

function DashboardPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer history={props.history}/>
      <main className={classes.main}>
        <BoardBody />
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  )
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DashboardPage history={this.props.history}/>
    )
  }
}

export default Dashboard;