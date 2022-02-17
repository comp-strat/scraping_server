import {makeStyles} from "@material-ui/core";

export const jobsStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  topButtonStyle: {
    padding: "8px 4px",
    alignItems: "center",
    margin: "15px",
    width: 120,
  },

  JobTableToolBarTitle: {
    flex: "1 1 100%",
  },

  tablePaper: {
    width: "100%",
  },

  tableContainer: {
    maxHeight: 1000,
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },

  main: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  }
}));