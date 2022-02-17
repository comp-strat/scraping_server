import {makeStyles} from "@material-ui/core";
import {styled} from "@mui/system";
import {Grid} from "@mui/material";

export const DatasetGrid = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(8),
  paddingLeft: theme.spacing(8),
}));

export const datasetsStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  exampleCardStyle: {
    maxWidth: 300,
  },

  exampleCardImageStyle: {
    height: 150,
  },

  main: {
    flexGrow: 1,
  },

  datasets: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
  },

  table: {
    maxWidth: 800
  },

  tablePaper: {
    width: "100%",
  },

  tableContainer: {
    maxHeight: 1000,
  },
}));