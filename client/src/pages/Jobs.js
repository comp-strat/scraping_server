import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import {LeftDrawer, Copyright} from '../components/Components.js'
import {pesudoJobs, tableHeader} from '../data/pesudoData.js'
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
import {makeStyles} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
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

const options = [
  'VIEW',
  'EDIT'
];

function descendingComparator(a, b, orderBy) {
  if (orderBy == "priority") {
    orderBy = "rank";
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

function NormalJobTableHead(props) {
  return (
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
  );
};

function EnhancedJobTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {tableHeader.slice(0, 4).map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{minWidth: column.minWidth}}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {tableHeader.slice(4, 5).map((column) => (
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
  );
}

function JobTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("ticket");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, pesudoJobs.length - page * rowsPerPage);

  return (
    <Grid container item direction="column">
      <Paper className={classes.tablePaper} variant="outlined">
        <JobTableToolBar />
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader>
            <EnhancedJobTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={pesudoJobs.length}
            />
            <TableBody>
              {stableSort(pesudoJobs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {tableHeader.slice(0, 4).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton
                        aria-controls="job-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="job-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: 96,
                            width: '20ch',
                          },
                        }}
                        TransitionComponent={Fade}
                      >
                        {options.map((option) => (
                          <MenuItem key={option} onClick={handleClose}>
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 81 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 100]}
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
      <LeftDrawer history={props.history}/>
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
        <Box pt={4}>
          <Copyright />
        </Box>
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
      <JobPage history={this.props.history}/>
    )
  }
}

export default Jobs;