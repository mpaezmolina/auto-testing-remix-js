import { useEffect } from "react";
import { useLocation } from "@remix-run/react";

function Oauth() {
  const location = useLocation();

  const hash = location.hash;
  const urlParams = new URLSearchParams(hash);
  const accessToken = urlParams.get("#access_token");

  useEffect(() => {
    async function saveToken() {
      console.log("Fetch");
      await fetch("save-token?access_token=" + accessToken);
      window.close();
    }
    saveToken();
  }, []);

  return <div></div>;
}

export default Oauth;
