import React, {Component} from "react";
import {fetcher} from "../util/fetcher";
// Components
import {Copyright} from "../components/Copyright";
import ResponsiveAppBar from "../components/Navbar";

//helpers
import {getComparator, stableSort} from "../util/jobSortingHelpers";

//Material UI
import {
  Grid, Table, TableBody, Container,
  TableCell, TableHead, TablePagination,
  TableRow, Toolbar, Box, TableSortLabel, Fab
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useHistory } from "react-router-dom";

//Styles
import config from "../server-config";
import {WCTableContainer, WCTablePaper} from "../styles/DatasetsStyled";
import {JobTableToolBarTitle, TopButton, RootDiv, Main} from "../styles/JobsStyled";

// const options = [
//   "VIEW",
//   "DOWNLOAD"
// ];

const jobsTableHeader = [
  {id: "Title", label: "Title", minWidth: 120, align: "left"},
  {id: "URLs", label: "URLs", minWidth: 120, align: "left"},
  {id: "Creator", label: "Creator", minWidth: 120, align: "right"},
  {id: "Date", label: "Date", minWidth: 120, align: "right"},
  {id: "Status", label: "Status", minWidth: 100, align: "right"},
  {id: "more", label: " ", minWidth: 40, align: "left"}
];

const handleNewJobClick = (props) => {
  props.history.push({
    pathname: "/new-job"
  });
};


function TopButtons(props) {

  return (
    <Grid container item
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <TopButton
        variant="extended"
        color="primary"
        onClick={() => handleNewJobClick(props)}
      >
        <AddIcon />
                NEW JOB
      </TopButton>
    </Grid>
  );
}


export function JobTableToolBar(props) {

  return (
    <Toolbar>
      <JobTableToolBarTitle
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <Box fontWeight="fontWeightBold" m={0}>
          {props.name}
        </Box>
      </JobTableToolBarTitle>
    </Toolbar>
  );
}


export function EnhancedJobTableHead(props) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {jobsTableHeader.slice(0, 5).map((column) => (
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
            </TableSortLabel>
          </TableCell>
        ))}
        {jobsTableHeader.slice(5, 5).map((column) => (
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

  const history = useHistory();

  const downloadFunc = (id) => {
    window.open(config.serverurl+"/job/"+id+"/files");
  };

  const viewProcess = (id) => {
    history.push("/job/"+id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  console.log(props.data);
  return (
    <Grid container item direction="column">
      <WCTablePaper variant="outlined">
        <JobTableToolBar name="Jobs"/>
        <WCTableContainer>
          <Table stickyHeader>
            <EnhancedJobTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.data.length}
            />
            <TableBody>
              {stableSort(props.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {

                  return (
                    <TableRow hover tabIndex={-1} key={row.id} onClick= {() => {
                      viewProcess(row.id);
                    }} style = {{cursor: "pointer"}}>
                      {jobsTableHeader.slice(0, 5).map((column) => {
                        const value = row[column.id];
                        console.log(row, column.id);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 81 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </WCTableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 100]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </WCTablePaper>
    </Grid>
  );
}

function JobsPage(props) {

  return (
    <div>
      <ResponsiveAppBar/>
      <RootDiv>
        {/*<LeftDrawer history={props.history}/>*/}
           
        <Container>
          <Main>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
            >
              <TopButtons history={props.history}/>
              <JobTable history={props.history} data={props.data}/>
            </Grid>
            <Box pt={4}>
              <Copyright/>
            </Box>
          </Main>
        </Container>

      </RootDiv>
    </div>
  );
}


class Jobs extends Component {
  state = {
    jobs: []
  };

  constructor(props) {
    super(props);
  }

  //TODO refactor
  getAllJobs = () => {
    fetcher(config.serverurl+"/jobs",{method:"GET"})
      .then(res => res.json())
      .then(res => {
        let jobs_array = [];
        res.data.forEach(d => {
          jobs_array.push({
            id: d._id,
            URLs: d.URLs.join(","),
            Creator: d.created_by,
            Date: (new Date(d.createdDate*1000)).toISOString(),
            Status: d.status,
            Title: d.title
          });
        });

        this.setState({
          jobs: jobs_array
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getAllJobs();
  }

  render() {
    return (
      <JobsPage history={this.props.history} data={this.state.jobs}/>
    );
  }
}


export default Jobs;