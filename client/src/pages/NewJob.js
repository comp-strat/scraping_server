import React, {Component} from "react";
import {fetchWithUserToken} from "../util/AuthManager";

//Components
import {Copyright} from "../components/Copyright";

// Material UI
import {
  TextField, Box, Grid, Typography,
  CardContent, Container, Card, FormGroup, CardActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Styles
import { RootDiv, Main, TopButton } from "../styles/JobsStyled";
import ResponsiveAppBar from "../components/Navbar";
import {useNavigate} from "react-router-dom";


class _NewJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      urls: [""]
    };
  }

  sendURLs = (urls, title) => {
    fetchWithUserToken("/api/jobs/create", {
      method: "POST",
      body: JSON.stringify({urls: urls, title: title})
    })
      .then(res => {
        this.props.navigate(`/job/${res.job_id}`);
        console.log(this.state);
      });
  };


  handleSubmit = (event) => {
    console.log("A name was submitted: ", this.state);
    if (this.state.urls.length === 1 && this.state.urls[0] === "") {
      return;
    }
    event.preventDefault();
    this.sendURLs(this.state.urls, this.state.title);
  };

  addURL = () => {
    this.setState({urls: this.state.urls.concat([""])});
  };

  removeURL = (i) => {
    return () => {
      let urls = this.state.urls;
      urls.splice(i,1);
      this.setState({urls: urls});
    };
  };

  render() {

    return (
      <RootDiv>
        {/*<ResponsiveAppBar/>*/}
        <Container style = {{marginTop: 20}}>
          <Main>
            <Grid
              container
              spacing="20px"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Card variant="outlined" style={
                {paddingTop: "20px", paddingBottom:"200px", paddingRight:"200px",paddingLeft:"20px"}
              }>
                <CardContent>
                  <Typography variant="h5" component="div">
                            Enter Title
                  </Typography>
                  <TextField
                    id="title-input"
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
                    {this.state.urls.map( (url, i) => {
                      return (
                        <FormGroup key={i} row>
                          <TextField id="title-input"
                            label={"URL " + (i+1)} 
                            variant="outlined"
                            name="title"
                            type="url"
                            size="small"
                            margin="dense"
                            autoComplete="url"
                            required={i===0}
                            value={this.state.urls[i]}
                            onChange={(event) => {
                              let urls = this.state.urls;
                              urls[i] = event.target.value;
                              this.setState({urls: urls});
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

export default function NewJob(props) {
  const navigate = useNavigate();
  return <_NewJob {...props} navigate={navigate} />;
}
