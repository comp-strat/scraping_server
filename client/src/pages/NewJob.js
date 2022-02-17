import React, {Component} from "react";
import {fetcher} from "../util/fetcher";

//Components
import {Copyright} from "../components/Copyright";

// recharts
import {Text} from "recharts";

// Material UI
import {
  TextField, Box, Fab, Grid, Typography,
  CardContent, Card, FormGroup, CardActions
} from "@mui/material";

// Styles
import {newJobStyles} from "../styles/newJobStyles";
import {withRouter} from "react-router-dom";
import config from "../server-config";
import ResponsiveAppBar from "../components/Navbar";
import { Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const classes = newJobStyles;

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
      <div className={classes.root}>
        <ResponsiveAppBar/>
        <Container style = {{marginTop: 20}}>
          <main className={classes.main}> <Grid
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
                                    
                        {i > 0 ? <Fab
                          size="small"
                          style={{margin:"10px"}}
                          variant="extended"
                          color="secondary"
                          className={classes.topButtonStyle}
                          onClick={this.removeURL(i)}>
                          <DeleteIcon/>
                        </Fab> : <p/>}
                                
                      </FormGroup>);})}
                </FormGroup>
                            

              </CardContent>
              <CardActions>
                <Fab
                  variant="extended"
                  color="primary"
                  className={classes.topButtonStyle}
                  onClick={this.addURL}>
                                    Add
                </Fab>
                <Fab
                  variant="extended"
                  color="primary"
                  className={classes.topButtonStyle}
                  //type="submit"
                  onClick={this.handleSubmit}>
                                Submit
                </Fab>
              </CardActions>

              {/*<SearchBar
                                value={this.state.value}
                                onChange={(newValue) => this.setState({ value: newValue })}
                                onRequestSearch={() => this.sendURLs(this.state.value)}
                                style={{
                                    margin: '0 auto',
                                    maxWidth: 800,
                                    minWidth: 600
                                }}
                            />

                            {this.state.success ?
                                (<p>A job with the following URLs was successfully created: <br/><b>{this.state.URLs}!</b> <br/> You will get an email once this job is finished! Please check out the results on the dataset page!</p>)
                                : (<p/>) }*/}

                        
            </Card>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Grid>
          </main></Container>
      </div>
    );
  }
}

export default withRouter(CreateNewJob);
