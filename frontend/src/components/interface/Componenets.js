import React, { Component } from "react";
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import ErrorIcon from '@material-ui/icons/Error';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Link from '@material-ui/core/Link';

const drawerWidth = 250;

const useStyles = makeStyles({

  user: {
    margin: '20px',
    alignItems: 'flex-start',
  },

  userName: {
    alignItems: 'flex-start',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },
});

export function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/URAP-charter">
        The Chapter School Team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function User(props) {
  const classes = useStyles();
  return (
    <div className={classes.user}>
      <Avatar src="/static/imgs/Pranav Bhasin.png" />
      <Typography component="div" variant="h6" component="h6" className={classes.userName}>
        <Box fontWeight="fontWeightBold" m={0}>
          {props.name}
        </Box>
      </Typography>
    </div>
  );
}

export function DrawerButton(props) {
  return (
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Typography component="div">
            <Box fontWeight="fontWeightBold" m={0}>
              {props.name}
            </Box>
          </Typography>
        }
      />
    </ListItem>
  );
}

export function LeftDrawer(props) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <User name="Pranav Bhasin"/>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardRoundedIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={0}>
                  Dashboard
                </Box>
              </Typography>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentTurnedInRoundedIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={0}>
                  Jobs
                </Box>
              </Typography>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentRoundedIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={0}>
                  Datasets
                </Box>
              </Typography>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={0}>
                  Errors
                </Box>
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListSubheader inset>Settings</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={0}>
                  Settings
                </Box>
              </Typography>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography component="div">
                <Box fontWeight="fontWeightBold" m={0}>
                  Notifications
                </Box>
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  )
}