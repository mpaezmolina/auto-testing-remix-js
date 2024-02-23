import { useEffect } from "react";
import { useLocation, useNavigate } from "@remix-run/react";

function Oauth() {
  const location = useLocation();
  //  const navigate = useNavigate();

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

  // useEffect(() => {
  //   navigate("/api/save-token?access_token=" + accessToken);
  // }, []);

  return <div>Oauth</div>;
}

export default Oauth;
