import { Card, Fab } from "@material-ui/core";
import React, { Component } from "react";
import {jobsStyles} from "../styles/jobsStyles";

const classes = jobsStyles;
class SingleJob extends Component {
    state = {
        status: "Loading"
    }

    constructor(props) {
        super(props);
    }
    
    killFunc = () => {
        fetch('http://localhost:8000/job/'+this.props.id, {method:"DELETE"});
        this.updateStatus()
    }

    downloadFunc = () => {
        window.open("http://localhost:8000/download/files/"+this.props.id);
    }

    updateStatus = () => {
        fetch('http://localhost:8000/job/'+this.props.id)
            .then(res => res.json())
            .then(res => {
                if (res.completion_status == "Ongoing") setTimeout(this.updateStatus,10000);
                this.setState({
                    status: res.completion_status
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.updateStatus()
    }

    render() {
        return (
            <Card variant="outlined" style={{padding:"20px",minWidth:"400px",minHeight:"400px"}}>
                <h2>Task Details</h2>
                {this.state.status == "Ongoing" ?
                    <div><p>Process is Running</p>
                    <Fab
                variant="extended"
                color="primary"
                className={classes.topButtonStyle} onClick={this.killFunc}>Kill</Fab></div>
                    : <div></div>
                }

                {this.state.status == "Error" ?
                    <div><p>Process Errored</p></div>
                    : <div></div>
                }

                {this.state.status != "Ongoing" ?
                    <div><p>Process Completed</p><Fab
                    variant="extended"
                    color="primary"
                    className={classes.topButtonStyle} onClick={this.downloadFunc}>Download</Fab></div>
                    : <div></div>
                }

            </Card>
        )
    }
}

export default SingleJob;
