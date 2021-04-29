import React, { Component } from "react";
import {Copyright, LeftDrawer} from '../components/Components.js'
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import {pesudoDatasetDetails, DatasetDetailHeader } from '../data/pesudoData.js'
import {TableToolBar} from './Jobs.js'
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },

  main: {
    flexGrow: 1,
  },

  tablePaper: {
    width: "100%",
  },

  tableContainer: {
    maxHeight: 1000,
  },
}));

const options = [
  'VIEW',
  'EDIT'
];

function NormalJobTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {DatasetDetailHeader.map((column) => (
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

function Details(props) {
	const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.datasets.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
      <Grid container item direction="column">
        <Paper className={classes.tablePaper} variant="outlined">
          <TableToolBar name="Dataset Details"/>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader>
              <NormalJobTableHead/>
              <TableBody>
                {props.data.datasets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      {DatasetDetailHeader.slice(0, 4).map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton
                          aria-controls="dataset details"
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
            rowsPerPageOptions={[1, 5, 10, 20, 100]}
            component="div"
            count={props.data.datasets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </div>
	)
}

export function DatasetDetailsPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer history={props.history}/>
      <main className={classes.main}>
				<Details history={props.history} data={props.data}/>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  )
}

class DatasetDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
    };
  }

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id');
    this.PesudoFetchDatasetDetailsResult(id);
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading
          ? <LinearProgress style={{ width: '100%' }} />
          : <DatasetDetailsPage history={this.props.history} data={this.state.data} />
        }
      </div>
    )
  }

  PesudoFetchDatasetDetailsResult(id) {
    this.setState({ isLoading: true });
    var dataLength = pesudoDatasetDetails.length;
    for (var i = 0; i < dataLength; i++) {
      if (id == pesudoDatasetDetails[i].id) {
        this.setState({ isLoading: false, data: pesudoDatasetDetails[i] });
        break;
      }
      else {
        continue;
      }
    }
  }
}

export default DatasetDetails;