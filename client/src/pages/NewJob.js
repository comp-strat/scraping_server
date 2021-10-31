import React, {Component} from "react";
import axios from "axios";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

// recharts
import {Text} from "recharts";

// Material UI
import Box from "@material-ui/core/Box";
import SearchBar from "material-ui-search-bar";
import Grid from "@material-ui/core/Grid";

// Styles
import {newJobStyles} from "../styles/newJobStyles";
import {withRouter} from "react-router-dom"
import config from '../server-config'

const classes = newJobStyles;

class CreateNewJob extends Component {
    
    state = {
        value: '',
        URLs: '',
        success: false
    }

    // classes = datasetsStyles();
    

    constructor(props) {
        super(props);
        
        
    }

    
    sendURLs(URLsString) {
        console.log(URLsString);
        this.setState({
            URLs: URLsString
        })

        axios
            .post(config.serverurl+'/job', {
                URLs: URLsString
            })
            .then(res => {
                this.props.history.push("/job/"+res.data.job.redisID);
                this.setState({
                    success: res.data.success,
                    value: ''
                })
                console.log(this.state);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className={classes.root}>
                <LeftDrawer history={this.props.history}/>
                <main className={classes.main}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <SearchBar
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
                            : (<p/>) }
                    </Grid>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </main>
            </div>
        )
    }
}

export default withRouter(CreateNewJob);
