import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import {LeftDrawer} from './Componenets.js'
import { makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },

  statCard: {
    width: 200,
    height: 200,
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

  main: {
    flexGrow: 1,
  }

});

export function ClientNumber(props) {
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

export function JobNumber(props) {
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

export function NotificationNumber(props) {
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

export function ErrorNumber(props) {
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

export function BoardBody(props) {
	const classes = useStyles();
	return (
    <Grid
      container
      item
      direction='row'
      alignItems="flex-start"
      spacing={2}
      xs={12}
    >
      <Grid
        container
        item
        justify="space-around"
        alignItems="center"
        spacing={2}
        xs={8}
      >
        <Grid item xs={2}>
          <ClientNumber number='128' name='Clients' />
        </Grid>
        <Grid item xs={2}>
          <JobNumber number='32' name='Completed Jobs'/>
        </Grid>
        <Grid item xs={2}>
          <NotificationNumber number='2' name='Notifications'/>
        </Grid>
        <Grid item xs={2}>
          <ErrorNumber number='4' name='Errors' />
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="column"
        justify="space-around"
        alignItems="center"
        xs={4}
      >
        <Card style={{width: 350, height: 350,}} variant="outlined">
          <CardContent>
            <Typography
              style={{fontSize: 40}}
              variant="h5" component="h2"
              align='center'
            >
              Test
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
	);
}

export function DashboardPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer />
      <main className={classes.main}>
        <BoardBody />
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
      <DashboardPage />
    )
  }
}

export default Dashboard;