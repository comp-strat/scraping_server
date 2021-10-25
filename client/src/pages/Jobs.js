import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Components
import {Copyright} from "../components/Copyright";
import {LeftDrawer} from "../components/LeftDrawer";

//helpers
import {getComparator, stableSort} from "../util/jobSortingHelpers";

//Material UI
import Grid from '@material-ui/core/Grid';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';

//Styles
import {jobsStyles} from "../styles/jobsStyles";
import {render} from "@testing-library/react";

const classes = jobsStyles;

const options = [
    'VIEW',
    'DOWNLOAD'
];

const jobsTableHeader = [
    {id: 'URLs', label: "URLs", minWidth: 200, align: 'left'},
    {id: 'Creator', label: "Creator", minWidth: 120, align: 'right'},
    {id: 'Date', label: "Date", minWidth: 120, align: 'right'},
    {id: 'Status', label: "Status", minWidth: 100, align: 'right'},
    {id: 'more', label: " ", minWidth: 40, align: 'left'}
];

const handleNewJobClick = (props) => {
    props.history.push({
        pathname: "/new-job"
    })
}


function TopButtons(props) {
    const classes = jobsStyles();

    return (
        <Grid container item
              direction="row"
              justify="flex-start"
              alignItems="center"
        >
            <Fab
                variant="extended"
                color="primary"
                className={classes.topButtonStyle}
                onClick={() => handleNewJobClick(props)}
            >
                <AddIcon/>
                NEW JOB
            </Fab>

            <Fab
                variant="extended"
                color="primary"
                className={classes.topButtonStyle}
            >
                <AddIcon/>
                SEARCH
            </Fab>
        </Grid>
    )
}


export function JobTableToolBar(props) {
    const classes = jobsStyles()

    return (
        <Toolbar>
            <Typography
                className={classes.JobTableToolBarTitle}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                <Box fontWeight="fontWeightBold" m={0}>
                    {props.name}
                </Box>
            </Typography>
        </Toolbar>
    );
}


export function EnhancedJobTableHead(props) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {jobsTableHeader.slice(0, 4).map((column) => (
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
                                    {order === "desc" ? " (sorted desc) " : " (sorted asc) "}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {jobsTableHeader.slice(4, 5).map((column) => (
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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    return (
        <Grid container item direction="column">
            <Paper className={classes.tablePaper} variant="outlined">
                <JobTableToolBar name="Jobs"/>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader>
                        <EnhancedJobTableHead
                            classes={classes}
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
                                        <TableRow hover tabIndex={-1} key={row.id}>
                                            {jobsTableHeader.slice(0, 4).map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Link to={"/job/"+row.id}>{value}</Link>
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <IconButton
                                                    aria-controls="job-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <MoreVertIcon/>
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
                                <TableRow style={{height: 81 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 100]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    )
}

function JobsPage(props) {
    const classes = jobsStyles()

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
                    <TopButtons history={props.history}/>
                    <JobTable history={props.history} data={props.data}/>
                </Grid>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </main>
        </div>
    )
}


class Jobs extends Component {
    state = {
        jobs: []
    }

    constructor(props) {
        super(props);
    }

    //TODO refactor
    getAllJobs = () => {
        axios
            .get('http://localhost:8000/jobs',)
            .then(res => {
                let jobs_array = []
                res.data.forEach(d => {
                    jobs_array.push({
                        id: d._id,
                        URLs: d.URLs,
                        Creator: d.created_by,
                        Date: d.createdDate,
                        Status: d.status
                    })
                })

                this.setState({
                    jobs: jobs_array
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getAllJobs()
    }

    render() {
        return (
            <JobsPage history={this.props.history} data={this.state.jobs}/>
        )
    }
}


export default Jobs;