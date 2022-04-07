import { Typography, Link } from "@mui/material";

import React from "react";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/URAP-charter">
                The Universal Web Crawling Team
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}