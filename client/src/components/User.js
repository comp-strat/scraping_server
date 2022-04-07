import React from "react";

//Material UI
import {Avatar, Box} from "@mui/material";

// Components
import { Username, UserDiv } from "../styles/ComponentStyled";

export function User(props) {

  return (
    <UserDiv>
      <Avatar src={props.image} />
      <Username component="div" variant="h6" component="h6">
        <Box fontWeight="fontWeightBold" m={0}>
          {props.name}
        </Box>
      </Username>
    </UserDiv>
  );
}