import axios from "axios";
import { json } from "@remix-run/node";
import { saveLongLivedTokenToLatest } from "../dao";

export const loader = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("access_token");

  const { data } = await axios.get("https://graph.facebook.com/v19.0/oauth/access_token", {
    params: {
      grant_type: "fb_exchange_token",
      client_id: "761954749115582",
      client_secret: "063ef8a356a9cf22d6cadc61957977d0",
      fb_exchange_token: accessToken,
    },
  });

  const installations_SocialNetwork = await saveLongLivedTokenToLatest(data.access_token);

  return json(installations_SocialNetwork);
};
