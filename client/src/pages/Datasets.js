import React, {Component} from "react";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

//Actions
import {fetcher, inMemoryUserManager} from "../util/fetcher";

// data


//Material UI
import {
  Box, Grid, Typography, Button, IconButton, Card,
  CardHeader, CardActions, CardContent, CardMedia
} from "@mui/material";

import { Share } from "@mui/icons-material";

//images
import Avatar from "@material-ui/core/Avatar";

// Styles
import {DatasetGrid, datasetsStyles} from "../styles/datasetsStyles";
import config from "../server-config";

function Title(props) {
  return (
    <Typography component="h2" variant="h4" color="primary" gutterBottom>
      {props.children}
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
  const classes = datasetsStyles();
  const user = inMemoryUserManager.getUser();
  const getProfile = () => {
    if (user.profileObj == undefined) {
      props.history.push("/");
    } else {
      return user.profileObj;
    }
  };

  console.log(props.data);
  return (
    <React.Fragment>
      <Title children="Datasets"/>
      <DatasetGrid
        container
        justify="space-evenly"
        spacing={3}
      >
        {props.data.map((job) => {
          return (
            <Grid item xs={2} md={3} sm={6} key={job.id}>
              <Card className={classes.exampleCardStyle}>
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
                <CardMedia
                  className={classes.exampleCardImageStyle}
                  src={"/static/img/Charlotte.jpg"}
                  title={job.URLs}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {job.URLs}
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
              </Card>
            </Grid>
          );
        })}
      </DatasetGrid>
    </React.Fragment>
  );
}

export function DatasetsPage(props) {
  const classes = datasetsStyles();

  return (
    <div className={classes.root}>
      <LeftDrawer history={props.history}/>
      <main className={classes.main}>
        <Samples history={props.history} data={props.data}/>
        <Box pt={4}>
          <Copyright/>
        </Box>
      </main>
    </div>
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
    fetcher(config.serverurl+"/jobs",{method:"GET"})
      .then(res => res.json())
      .then(res => {
        let jobs_array = [];
        console.log(res);
        res.data.forEach(d => {
          if (d.status === "Finished") {
            jobs_array.push({
              id: d._id,
              URLs: d.URLs,
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