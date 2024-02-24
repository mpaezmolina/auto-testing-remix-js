import { useEffect } from "react";
import { useLocation, useNavigate } from "@remix-run/react";

function Oauth() {
  const location = useLocation();

  const hash = location.hash;
  const urlParams = new URLSearchParams(hash);
  const accessToken = urlParams.get("#access_token");

  console.log("Start Oauth " + accessToken);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetch");
      await fetch("save-token?access_token=" + accessToken);
      window.close();
    }
    fetchData();
  }, []);

  return <div></div>;
}

export default Oauth;
