import React from "react";

//Material UI
import {
  Divider, List, ListItem, ListItemIcon,
  ListItemText, Typography, Box, ListSubheader
} from "@mui/material";
import {
  DashboardRounded, AssignmentTurnedInRounded,
  AssignmentRounded, Error, Settings, Notifications
} from "@mui/icons-material";

//Components
import {User} from "./User";
import {handleRoutes} from "../util/handleRoutes";
import Logout from "../components/Logout.js";


//Styles
import { WCDrawer, drawerPaper } from "../styles/ComponentStyled";

import {AuthManager} from "../util/AuthManager";
import { Redirect, useHistory } from "react-router-dom";


export function LeftDrawer(props) {
  const history = useHistory();
  const user = AuthManager.getUser();

  return (
    user != null && user.profileObj !== undefined ?
      <WCDrawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: drawerPaper,
        }}
      >
        <User name={user.profileObj.name} image={user.profileObj.imageUrl}/>
        <Divider />
        <List>
          <ListItem button onClick={() => handleRoutes(props, "dashboard")}>
            <ListItemIcon>
              <DashboardRounded />
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
          <ListItem button onClick={() => handleRoutes(props, "jobs")}>
            <ListItemIcon>
              <AssignmentTurnedInRounded />
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
          <ListItem button onClick={() => handleRoutes(props, "datasets")}>
            <ListItemIcon>
              <AssignmentRounded />
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
              <Error />
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
              <Settings />
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
              <Notifications />
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

          <ListItem>
            <Logout/>
          </ListItem>
        </List>
      </WCDrawer> : <Redirect to = {{
        pathname: "/",
        search: history.location.search,
        state: { referrer: history.location.pathname }
      }}/>
  );
}