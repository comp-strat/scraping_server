import React from "react";

//Material UI
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Components
import { componentStyles } from "../styles/componentStyles";

// images
import pranav from "../static/img/pranav.png";

export function User(props) {
    const classes = componentStyles();

    return (
        <div className={classes.user}>
            <Avatar src={pranav} />
            <Typography component="div" variant="h6" component="h6" className={classes.userName}>
                <Box fontWeight="fontWeightBold" m={0}>
                    {props.name}
                </Box>
            </Typography>
        </div>
    );
}