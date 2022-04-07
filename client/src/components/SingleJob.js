import {
  Card, CardContent, CardHeader, Typography,
  CardActions, List, ListItem, ListItemButton, ListItemText
} from "@mui/material";
import React, { Component } from "react";
import {TopButton} from "../styles/JobsStyled";
import {fetchWithUserToken} from "../util/AuthManager";

class SingleJob extends Component {
  state = {
    status: "Loading",
    title: "",
    urls: []
  };

  constructor(props) {
    super(props);
  }
    
  killFunc = () => {
    fetchWithUserToken(`/api/jobs/${this.props.id}`, {method:"DELETE"})
      .then(res => this.updateStatus());
  };

  downloadFunc = () => {
    fetchWithUserToken(`/api/jobs/${this.props.id}/files`, {method:"GET"})
      .then(response => response.blob())
      .then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = this.props.id + ".zip";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         
      });
  };

  updateStatus = () => {
    fetchWithUserToken(`/api/jobs/${this.props.id}`, {method:"GET"})
      .then(res => {
        if (res.status === "Ongoing") setTimeout(this.updateStatus,10000);
        this.setState({
          urls: res.urls,
          title: res.title,
          status: res.status
        });
      });
  };

  componentDidMount() {
    this.updateStatus();
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
            {this.state.urls.map( (url, i) => {
              return (
                <ListItem disablePadding key={i}>
                  <ListItemButton component="a" href={url}>
                    <ListItemText primary={url} />
                  </ListItemButton>
                </ListItem>
              );}
            )} </List>
        </CardContent>
                
        {
          {
            "Ongoing": <div><CardContent><p>Process is Running</p></CardContent>
              <CardActions><TopButton
                variant="extended"
                color="primary"
                onClick={this.killFunc}>
                                    Kill
              </TopButton></CardActions>
            </div>,

            "Error": <CardContent><p>Process Errored</p></CardContent>,
            "Finished": <div><CardContent><p>Process Completed</p></CardContent>
              <CardActions><TopButton
                variant="extended"
                color="primary"
                onClick={this.downloadFunc}>
                                Download
              </TopButton></CardActions>
            </div>,
            "Cancelled": <CardContent><p>Process Cancelled</p></CardContent>,
            "Failed": <CardContent><p>Process Failed</p></CardContent>
          }[this.state.status]
        }

      </Card>
    );
  }
}

export default SingleJob;
