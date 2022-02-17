import {ListItem, ListItemIcon, ListItemText, Typography, Box} from "@mui/material";
import { Inbox } from "@mui/icons-material";


import React from "react";

export function DrawerButton(props) {
  return (
    <ListItem button>
      <ListItemIcon>
        <Inbox />
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
