import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import {LeftDrawer} from './Componenets.js'
import {pesudoJobs, tableHeader} from './pesudoData.js'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },

  topButtonStyle: {
    padding: '8px 4px',
    alignItems: 'center',
    margin: '15px',
    width: 120,
  },

  JobTableToolBarTitle: {
    flex: '1 1 100%',
  },

  tablePaper: {
    width: "100%",
  },

  tableContainer: {
    maxHeight: 800,
  },

  main: {
    flexGrow: 1,
  }
});

function TopButtons(props) {
  const classes = useStyles();
  return (
    <Grid container item
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        className={classes.topButtonStyle}
      >
        NEW JOB
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        className={classes.topButtonStyle}
      >
        SEARCH
      </Button>
    </Grid>
  )
}

function JobTableToolBar(props) {
  const classes = useStyles();
  return (
    <Toolbar>
      <Typography
        className={classes.JobTableToolBarTitle}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <Box fontWeight="fontWeightBold" m={0}>
          Jobs
        </Box>
      </Typography>
      <Tooltip title="Filter list">
        <IconButton aria-label="sort list">
          <SortIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

function JobTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container item direction="column">
      <Paper className={classes.tablePaper} variant="outlined">
        <JobTableToolBar />
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableHeader.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pesudoJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {tableHeader.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pesudoJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  )
}

export function JobPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer />
      <main className={classes.main}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-end"
        >
          <TopButtons />
          <JobTable />
        </Grid>
      </main>
    </div>
  )
}

class Jobs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <JobPage />
    )
  }
}

export default Jobs;