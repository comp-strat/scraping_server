import React from "react";

//Material UI
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import ErrorIcon from "@material-ui/icons/Error";
import ListSubheader from "@material-ui/core/ListSubheader";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";

//Components
import {User} from "./User";
import {handleRoutes} from "../util/handleRoutes";

//Styles
import { componentStyles } from "../styles/componentStyles";



export function LeftDrawer(props) {
    const classes = componentStyles();

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
                <ListItem button onClick={() => handleRoutes(props, "dashboard")}>
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
                <ListItem button onClick={() => handleRoutes(props, "jobs")}>
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
                <ListItem button onClick={() => handleRoutes(props, "datasets")}>
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