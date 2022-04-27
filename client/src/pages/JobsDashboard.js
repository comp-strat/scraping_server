import React, {Component} from "react";
import {fetchWithUserToken} from "../util/AuthManager";
import {Copyright} from "../components/Copyright";
import ResponsiveAppBar from "../components/Navbar";
import {getComparator, stableSort} from "../util/jobSortingHelpers";
import {
  Grid, Table, TableBody, Container,
  TableCell, TableHead, TablePagination,
  TableRow, Toolbar, Box, TableSortLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {WCTableContainer, WCTablePaper} from "../styles/DatasetsStyled";
import {JobTableToolBarTitle, TopButton, RootDiv, Main} from "../styles/JobsStyled";

const jobsTableHeader = [
  {id: "title", label: "Title", minWidth: 100, align: "left"},
  {id: "urls", label: "URLs", minWidth: 100, align: "left"},
  {id: "user", label: "Creator", minWidth: 100, align: "left"},
  {id: "creation_dt", label: "Date", minWidth: 60, align: "left"},
  {id: "status", label: "Status", minWidth: 60, align: "left"},
  {id: "num_links", label: "# of Links", minWidth: 60, align: "left"},
  {id: "num_errors", label: "# of Errors", minWidth: 60, align: "left"},
  {id: "elapsed_time", label: "Time", minWidth: 60, align: "left"}
];

function TopButtons(props) {

  const handleNewJobClick = () => {
    props.navigate("/new-job");
  };

  return (
    <Grid container item
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <TopButton
        variant="extended"
        color="primary"
        onClick={() => handleNewJobClick()}
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
        variant="h5"
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
        {jobsTableHeader.slice(0, 8).map((column) => (
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
        {jobsTableHeader.slice(8, 8).map((column) => (
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

  const viewJob = (id) => {
    props.navigate(`/job/${id}`, {state: {navigate: props.navigate}});
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.jobs.length - page * rowsPerPage);
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
              rowCount={props.jobs.length}
            />
            <TableBody>
              {stableSort(props.jobs, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.job_id} onClick= {() => {
                      viewJob(row.job_id);
                    }} style = {{cursor: "pointer"}}>
                      {jobsTableHeader.slice(0, 8).map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={`${row.job_id} - ${column.id}`} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 81 * emptyRows}}>
                  <TableCell colSpan={8}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </WCTableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 100]}
          component="div"
          count={props.jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </WCTablePaper>
    </Grid>
  );
}


class _JobsDashboard extends Component {
  state = {
    jobs: []
  };

  constructor(props) {
    super(props);
  }

  getAllJobs = () => {
    fetchWithUserToken("/api/jobs",{method:"GET"})
      .then(res => {
        this.setState({
          jobs: res.jobs
        });
      });
  };

  componentDidMount() {
    this.getAllJobs();
  }

  render() {
    return (
      <RootDiv>
        <Container>
          <Main>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
            >
              <TopButtons navigate={this.props.navigate}/>
              <JobTable navigate={this.props.navigate} jobs={this.state.jobs}/>
            </Grid>
            <Box pt={4}>
              <Copyright/>
            </Box>
          </Main>
        </Container>
      </RootDiv>
    );
  }
}

export default function JobsDashboard(props) {
  const navigate = useNavigate();
  return <_JobsDashboard {...props} navigate={navigate} />;
}
