import React, {Component} from "react";
import axios from "axios";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

// recharts
import {Text} from "recharts";

// Material UI
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

// Styles
import {datasetsStyles} from "../styles/datasetsStyles";

const classes = datasetsStyles;


class ViewDataset extends Component {
    state = {
        outputItems: null
    }

    // classes = datasetsStyles();

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        axios
            .get('http://localhost:8000/get-all-output-items')
            .then(res => {
                this.setState({
                    outputItems: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let outputItemsMarkup = this.state.outputItems ? (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Depth</TableCell>
                            <TableCell align="right">School</TableCell>
                            <TableCell align="right">Text</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.outputItems.map((item) => (
                            <TableRow key={item.school_id}>
                                <TableCell component="th" scope="row">{item.url}</TableCell>
                                <TableCell align="right">{item.depth}</TableCell>
                                <TableCell align="right">{item.school_id}</TableCell>
                                <TableCell align="right">{item.text}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : <p>Loading....</p>

        return (
            <div className={classes.root}>
                <LeftDrawer history={this.props.history}/>
                <main className={classes.main}>
                    {outputItemsMarkup}
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </main>
            </div>
        )
    }
}

export default ViewDataset;