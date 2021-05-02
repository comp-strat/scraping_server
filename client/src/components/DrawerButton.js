import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React from "react";

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
