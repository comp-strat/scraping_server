import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";
import {inMemoryUserManager} from '../util/fetcher'

import config from '../server-config'


function Logout() {
  const history = useHistory();
  const onSuccess = () => {
    console.log('Logout made successfully');
    history.push("/");
    inMemoryUserManager.deleteUser();
  };

  return (
    <div>
      <GoogleLogout
        clientId={config.google_oauth_clientid}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
