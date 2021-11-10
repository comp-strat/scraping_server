import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../util/refreshToken';

import { useHistory } from "react-router-dom";

const clientId =
  '1080632962111-av26u4euc5vgoollpmfbrtiissptg4dc.apps.googleusercontent.com';


// function HomeButton() {
//
//
//     }

function Login() {
  const history = useHistory();
  const onSuccess = (res) => {


    console.log('Login Success: currentUser:', res.profileObj);

    alert(
      `Logged in successfully welcome ${res.profileObj.name}`
    );
    refreshTokenSetup(res);

    history.push("/dashboard")


  };



  const onFailure = (res) => {
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
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
