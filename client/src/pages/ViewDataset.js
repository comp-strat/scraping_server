import React, {Component} from "react";
import axios from "axios";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

// Material UI
import {
  Box, Table, TableCell,
  TableHead, TableBody, TableRow, LinearProgress, Grid,
  IconButton, Menu, Fade, MenuItem, TablePagination
} from "@mui/material";

import {MoreVert} from "@mui/icons-material";

// Styles
import {Main, RootDiv, WCTableContainer, WCTablePaper} from "../styles/DatasetsStyled";

import config from "../server-config";
import {JobTableToolBar} from "./JobsDashboard";

const options = [
  "DOWNLOAD"
];

export const DatasetDetailHeader = [
  {id: "text", label: "Text", minWidth: 200, align: "left"},
  {id: "school_id", label: "School ID", minWidth: 120, align: "right"},
  {id: "url", label: "URL", minWidth: 120, align: "right"},
  {id: "depth", label: "Depth", minWidth: 100, align: "right"},
  {id: "more", label: " ", minWidth: 40, align: "left"}
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
}

function Details(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
    <RootDiv>
      <Grid container item direction="column">
        <WCTablePaper variant="outlined">
          <JobTableToolBar name="Dataset Details"/>
          <WCTableContainer>
            <Table stickyHeader>
              <NormalJobTableHead/>
              <TableBody>
                {props.data
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
                            <MoreVert />
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
                                width: "20ch",
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
          </WCTableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 5, 10, 20, 100]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </WCTablePaper>
      </Grid>
    </RootDiv>
  );
}


function DatasetDetailsPage(props) {

  return (
    <RootDiv>
      <LeftDrawer history={props.history}/>
      <Main>
        <Details history={props.history} data={props.data}/>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Main>
    </RootDiv>
  );
}

class ViewDataset extends Component {
  state = {
    isLoading: true,
    data: null,
  };

  // classes = datasetsStyled();

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.setState({ isLoading: true });

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const dataset_id = params.get("id");


    axios
      .get(config.serverurl+"/get-all-output-items")
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data
        });
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        {
          this.state.isLoading
            ? <LinearProgress style={{ width: "100%" }} />
            : <DatasetDetailsPage history={this.props.history} data={this.state.data} />
        }
      </div>
    );
  }
}

export default ViewDataset;