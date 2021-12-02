import { Card, Fab } from "@material-ui/core";
import React, { Component } from "react";
import {jobsStyles} from "../styles/jobsStyles";
import config from '../server-config'
import {fetcher} from "../util/fetcher";

const classes = jobsStyles;
class SingleJob extends Component {
    state = {
        status: "Loading"
    }

    constructor(props) {
        super(props);
    }
    
    killFunc = () => {
        fetcher(config.serverurl+'/job/'+this.props.id, {method:"DELETE"})
            .then(res => this.updateStatus());
    }

    downloadFunc = () => {
        fetcher(config.serverurl+"/job/"+this.props.id+"/files", {method:"GET"})
            .then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = this.props.id + ".zip";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();    
                a.remove();  //afterwards we remove the element again         
            });
    }

    updateStatus = () => {
        fetcher(config.serverurl+'/job/'+this.props.id, {method:"GET"})
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
            <Card variant="outlined" style={{paddingTop: "20px", paddingBottom:"200px", paddingRight:"200px",paddingLeft:"20px"}}>
                <h2>Task Details</h2>

                {
                    {
                    'Ongoing': <div><p>Process is Running</p>
                            <Fab
                                variant="extended"
                                color="primary"
                                className={classes.topButtonStyle} 
                                onClick={this.killFunc}>
                                    Kill
                            </Fab>
                        </div>,

                    'Error': <div><p>Process Errored</p></div>,
                    'Finished': <div><p>Process Completed</p>
                        <Fab
                            variant="extended"
                            color="primary"
                            className={classes.topButtonStyle}
                            onClick={this.downloadFunc}>
                                Download
                        </Fab>
                    </div>,
                    'Cancelled': <div><p>Process Cancelled</p></div>,
                    'Failed': <div><p>Process Failed</p></div>
                    }[this.state.status]
                }

            </Card>
        )
    }
}

export default SingleJob;
