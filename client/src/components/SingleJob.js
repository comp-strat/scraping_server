import { Card, CardContent, CardHeader, Fab, Typography, CardActions, List, ListItem} from "@material-ui/core";
import { ListItemButton,ListItemText } from '@mui/material';
import React, { Component } from "react";
import {jobsStyles} from "../styles/jobsStyles";
import config from '../server-config'
import {fetcher} from "../util/fetcher";

const classes = jobsStyles;
class SingleJob extends Component {
    state = {
        status: "Loading",
        title: "",
        URLs: []
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
                    URLs: res.URLs,
                    title: res.title,
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
            <Card variant="outlined" style={{paddingTop: "20px", paddingBottom:"100px", paddingRight:"100px",paddingLeft:"20px"}}>
                <CardHeader>Task Details</CardHeader>
                <CardContent>
                <Typography variant="h3" component="div">
                    {this.state.title}
                </Typography>
                <List>
                {this.state.URLs.map( (url, i) => {
                            return (
                    <ListItem disablePadding>
                        <ListItemButton component="a" href={url}>
                        <ListItemText primary={url} />
                        </ListItemButton>
                    </ListItem>
                   )}
                )} </List>
                </CardContent>
                
                {
                    {
                    'Ongoing': <div><CardContent><p>Process is Running</p></CardContent>
                            <CardActions><Fab
                                variant="extended"
                                color="primary"
                                className={classes.topButtonStyle} 
                                onClick={this.killFunc}>
                                    Kill
                            </Fab></CardActions>
                        </div>,

                    'Error': <CardContent><p>Process Errored</p></CardContent>,
                    'Finished': <div><CardContent><p>Process Completed</p></CardContent>
                        <CardActions><Fab
                            variant="extended"
                            color="primary"
                            className={classes.topButtonStyle}
                            onClick={this.downloadFunc}>
                                Download
                        </Fab></CardActions>
                    </div>,
                    'Cancelled': <CardContent><p>Process Cancelled</p></CardContent>,
                    'Failed': <CardContent><p>Process Failed</p></CardContent>
                    }[this.state.status]
                }

            </Card>
        )
    }
}

export default SingleJob;
