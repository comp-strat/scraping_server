import React, {Component} from "react";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

//Actions
import {AuthManager} from "../util/AuthManager";

//Material UI
import {
  Avatar, Box, Grid, Typography, Button, IconButton,
  CardHeader, CardActions, CardContent,
} from "@mui/material";

import { Share } from "@mui/icons-material";

// Styles
import {
  ExampleCard, ExampleCardImage, DatasetGrid, RootDiv,
  Main,
} from "../styles/DatasetsStyled";

function Title(props) {
  return (
    <Typography component="h2" variant="h4" color="primary" gutterBottom>
      {props.text}
    </Typography>
  );
}

const handleDatasetCardViewClick = (props, id) => {
  props.history.push({
    pathname: "/viewDataset",
    search: "?id=" + id,
  });
};

const handleDatasetCardDownloadClick = () => {
  //...
};

function Samples(props) {
  const user = AuthManager.getUser();
  const getProfile = () => {
    if (user.profileObj === undefined) {
      props.history.push("/");
    } else {
      return user.profileObj;
    }
  };

  console.log(props.data);
  return (
    <React.Fragment>
      <Title text="Datasets"/>
      <DatasetGrid
        container
        justify="space-evenly"
        spacing={3}
      >
        {props.data.map((job) => {
          return (
            <Grid item xs={2} md={3} sm={6} key={job.id}>
              <ExampleCard>
                <CardHeader
                  avatar={<Avatar src={getProfile().imageUrl}/>}
                  action={
                    <IconButton>
                      <Share/>
                    </IconButton>
                  }
                  title={job.Creator}
                  subheader={job.Date}
                />
                <ExampleCardImage
                  src={"/static/img/Charlotte.jpg"}
                  title={job.urls}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {job.urls}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDatasetCardViewClick(props, job.id)}
                  >
                    VIEW
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDatasetCardDownloadClick(props, job.id)}
                  >
                    DOWNLOAD
                  </Button>
                </CardActions>
              </ExampleCard>
            </Grid>
          );
        })}
      </DatasetGrid>
    </React.Fragment>
  );
}

export function DatasetsPage(props) {

  return (
    <RootDiv>
      <LeftDrawer history={props.history}/>
      <Main>
        <Samples history={props.history} data={props.data}/>
        <Box pt={4}>
          <Copyright/>
        </Box>
      </Main>
    </RootDiv>
  );
}

class Datasets extends Component {
  state = {
    jobs: []
  };

  constructor(props) {
    super(props);
  }

  getCompletedJobs = () => {
    AuthManager(config.serverurl+"/jobs",{method:"GET"})
      .then(res => res.json())
      .then(res => {
        let jobs_array = [];
        console.log(res);
        res.data.forEach(d => {
          if (d.status === "Finished") {
            jobs_array.push({
              id: d._id,
              urls: d.urls,
              Creator: d.created_by,
              Date: d.createdDate,
              Status: d.status
            });
          }
        });

        this.setState({
          jobs: jobs_array
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getCompletedJobs();
  }

  render() {
    return (
      <DatasetsPage history={this.props.history} data={this.state.jobs}/>
    );
  }
}

export default Datasets;