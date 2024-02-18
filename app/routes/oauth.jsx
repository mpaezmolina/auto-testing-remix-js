import axios from "axios";
import { useEffect } from "react";

import { useLocation, useNavigate } from "@remix-run/react";

function Oauth() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the hash fragment from the location object
  const hash = location.hash;

  // Parse the hash fragment to get the access_token parameter
  const urlParams = new URLSearchParams(hash);
  const accessToken = urlParams.get("#access_token");
  console.log("ff " + JSON.stringify(accessToken));

  useEffect(() => {
    navigate("/save-token?access_token=" + accessToken);
  }, []);

  return <div>Oauth</div>;
}

export default Oauth;
