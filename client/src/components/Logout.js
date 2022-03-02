import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import {inMemoryUserManager} from "../util/fetcher";

function Logout() {
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("Logout made successfully");
    navigate("/");
    inMemoryUserManager.deleteUser();
  };

  return (
    <div>
      <GoogleLogout
        clientId={"980011737294-kriddo55g39bja7timpfk233lm83l8jl.apps.googleusercontent.com"}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
