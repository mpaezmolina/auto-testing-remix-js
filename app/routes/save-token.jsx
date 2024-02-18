import axios from "axios";
import { json } from "@remix-run/node";
import { useEffect } from "react";

export const loader = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  // Get the value of a specific query parameter
  const accessToken = searchParams.get("access_token");

  axios
    .get("https://graph.facebook.com/v19.0/oauth/access_token", {
      params: {
        grant_type: "fb_exchange_token",
        client_id: "761954749115582",
        client_secret: "063ef8a356a9cf22d6cadc61957977d0",
        fb_exchange_token: accessToken,
      },
    })
    .then((response) => {
      console.log("long lived token:  " + response.data.access_token);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return json({
    status: "Success",
  });
};

function SaveToken() {
  useEffect(() => {
    window.close();
  }, []);

  return <div>SaveToken</div>;
}

export default SaveToken;
