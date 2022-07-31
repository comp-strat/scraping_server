import React, {Component} from "react";
import {fetchWithUserToken} from "../util/AuthManager";

//Components
import {Copyright} from "../components/Copyright";

// Material UI
import {
  TextField, Box, Grid, Button,
  CardContent, Container, Card, FormGroup, CardActions, CardHeader
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// Styles
import { RootDiv, Main } from "../styles/JobsStyled";
import { styled } from "@mui/material/styles";
import ResponsiveAppBar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

const Input = styled("input")`
  display: none;
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
`;

const NewJobCard = styled(Card)`
  width: 50%;
  min-width: 400px;
  margin: 30px auto;
  padding: 10px 30px 30px;
`;

class _NewJob extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      csv_file: null,
      urls: [],
    };
  }

  handleSubmit = (event) => {
    if (!this.state.title || (!this.state.urls.length && !this.state.csv_file)) {
      return;
    }
    event.preventDefault();
    const requestURI = "/api/jobs/create";
    let request;
    if (this.state.csv_file) {
      const formData = new FormData();
      formData.append("csv_file", this.state.csv_file);
      formData.append("title", this.state.title);
      request = fetchWithUserToken(requestURI, {
        method: "POST",
        body: formData
      });
    } else {
      request = fetchWithUserToken("/api/jobs/create", {
        method: "POST",
        body: JSON.stringify({urls: this.state.urls, title: this.state.title})
      });
    }

    request.then(res => {
      this.props.navigate(`/job/${res.job_id}`);
      console.log(this.state);
    });
  };

  handleFileUpload = (event) => {
    this.setState({
      csv_file: event.target.files[0],
      urls: [],
    });
  };

  addURL = () => {
    this.setState({
      csv_file: null,
      urls: this.state.urls.concat([""]),
    });
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
            <Grid container spacing="20px" direction="column" justify="center" alignItems="center">
              <NewJobCard variant="outlined">
                <CardHeader title={"Create a new job"} subheader={"Enter URLs or upload a CSV file"} />
                <CardContent>
                  <TextField id="title-input" label="Title" variant="outlined" name="title" type="text" 
                    size="small" value={this.state.title} margin="dense"
                    onChange={(event) => {
                      this.setState({title: event.target.value});
                    }}
                  />
                  <FormGroup>
                    {
                      this.state.urls.map( (url, i) => {
                        return (
                          <FormGroup key={i} row>
                            <TextField id="title-input" label={`URL ${i+1}`} variant="outlined" name="url"
                              type="url" size="small" margin="dense" autoComplete="url"
                              value={this.state.urls[i]} onChange={(event) => {
                                let urls = this.state.urls;
                                urls[i] = event.target.value;
                                this.setState({urls: urls});
                              }}/>
                            <Button size="small" style={{margin:"10px"}} variant="contained"
                              color="error" onClick={this.removeURL(i)}>
                              <DeleteIcon/>
                            </Button>
                          </FormGroup>);}
                      )
                    }
                  </FormGroup>
                  {
                    this.state.csv_file &&
                    <TextField id="title-input" label={this.state.csv_file.name} size="small"
                               margin="dense" disabled />
                  }

                </CardContent>
                <CardActions disableSpacing>
                  <Button variant="outlined" color="primary" onClick={this.addURL} startIcon={<AddIcon />}>
                    Add URL
                  </Button>
                  <label htmlFor="contained-button-file" style={{paddingLeft: "20px"}}>
                    <Input accept=".csv" id="contained-button-file" multiple type="file" onChange={this.handleFileUpload} />
                    <Button variant="outlined" color="primary" component="span" startIcon={<FileUploadIcon />}>
                      Upload CSV
                    </Button>
                  </label>
                  <SubmitButton variant="contained" color="primary" onClick={this.handleSubmit} endIcon={<SendIcon />}>
                    Submit
                  </SubmitButton>
                </CardActions>
              </NewJobCard>
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
