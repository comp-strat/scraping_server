import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../util/refreshToken';

import { useHistory } from "react-router-dom";
import {store, useGlobalState} from 'state-pool';

const clientId =
  '1080632962111-av26u4euc5vgoollpmfbrtiissptg4dc.apps.googleusercontent.com';


// function HomeButton() {
//
//
//     }

store.setState("user",{})

function Login() {
  const history = useHistory();
  const [user, setUser] = useGlobalState("user");
  const OnSuccess = (res) => {
    console.log(res);
    console.log('Login Success: currentUser:', res.profileObj);
    setUser(res);
    //alert(
    //  `Logged in successfully welcome ${res.profileObj.name}`
    //);
    refreshTokenSetup(res);

    history.push("/dashboard");


  };



  const OnFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={OnSuccess}
        onFailure={OnFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
