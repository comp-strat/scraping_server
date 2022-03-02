import React, {Component} from "react";
import {fetcher} from "../util/fetcher";

//Components
import {Copyright} from "../components/Copyright";

// Material UI
import {
  TextField, Box, Grid, Typography,
  CardContent, Container, Card, FormGroup, CardActions
} from "@mui/material";

// Styles
import { RootDiv, Main, TopButton } from "../styles/JobsStyled";
import {withRouter} from "react-router-dom";
import config from "../server-config";
import ResponsiveAppBar from "../components/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";

class CreateNewJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      URLs: [""]
    };
  }

  sendURLs = (URLsString,title) => {
    console.log(URLsString);

    fetcher(config.serverurl+"/job", {
      method: "POST",
      body: JSON.stringify({urls: URLsString,title:title})
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push("/job/"+res.job_id);
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };


  handleSubmit = (event) => {
    console.log("A name was submitted: " , this.state);
    event.preventDefault();
    this.sendURLs(this.state.URLs.join(","),this.state.title);
  };

  addURL = () => {
    this.setState({URLs:this.state.URLs.concat([""])});
  };

  removeURL = (i) => {
    return () => {
      let urls = this.state.URLs;
      urls.splice(i,1);
      this.setState({URLs:urls});
    };
  };

  render() {

    return (
      <RootDiv>
        <ResponsiveAppBar/>
        <Container style = {{marginTop: 20}}>
          <Main>
            <Grid
              container
              spacing="20px"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Card variant="outlined" style={{paddingTop: "20px", paddingBottom:"200px", paddingRight:"200px",paddingLeft:"20px"}}>
                <CardContent>
                  <Typography variant="h5" component="div">
                            Enter Title
                  </Typography>
                  <TextField id="title-input" 
                    label="Title" 
                    variant="outlined"
                    name="title"
                    type="text"
                    value={this.state.title}
                    fullWidth={true}
                    margin="normal"
                    onChange={(event) => {this.setState({title: event.target.value});}}
                  />
                        
                  <Typography style = {{marginTop:"20px"}} variant="h5" component="div">
                            Enter URLs
                  </Typography>
                  <FormGroup>
                    {this.state.URLs.map( (url, i) => {
                      return (
                        <FormGroup key={i} row>
                          <TextField id="title-input"
                            label={"URL " + (i+1)} 
                            variant="outlined"
                            name="title"
                            type="text"
                            size="small"
                            margin="dense"
                            type="url"
                            autoComplete="url"
                            required={i==0}
                            value={this.state.URLs[i]}
                            onChange={(event) => {
                              let urls = this.state.URLs;
                              urls[i] = event.target.value;
                              this.setState({URLs:urls});
                            }}/>
                                    
                          {i > 0 ? <TopButton
                            size="small"
                            style={{margin:"10px"}}
                            variant="extended"
                            color="secondary"
                            onClick={this.removeURL(i)}>
                            <DeleteIcon/>
                          </TopButton> : <p/>}
                                
                        </FormGroup>);})}
                  </FormGroup>

                </CardContent>
                <CardActions>
                  <TopButton
                    variant="extended"
                    color="primary"
                    onClick={this.addURL}>
                                    Add
                  </TopButton>
                  <TopButton
                    variant="extended"
                    color="primary"
                    //type="submit"
                    onClick={this.handleSubmit}>
                                Submit
                  </TopButton>
                </CardActions>
              </Card>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Grid>
          </Main></Container>
      </RootDiv>
    );
  }
}

export default withRouter(CreateNewJob);
