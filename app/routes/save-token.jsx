import axios from "axios";
import { json } from "@remix-run/node";
import { saveLongLivedTokenToLatest } from "../dao";

export const loader = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("access_token");
  console.log("Start save-token " + accessToken);

  const { data } = await axios.get("https://graph.facebook.com/v19.0/oauth/access_token", {
    params: {
      grant_type: "fb_exchange_token",
      client_id: "761954749115582",
      client_secret: "063ef8a356a9cf22d6cadc61957977d0",
      fb_exchange_token: accessToken,
    },
  });

  console.log("access_token " + data.access_token);

  const installations_SocialNetwork = await saveLongLivedTokenToLatest(data.access_token);

  console.log("SAVED " + json(installations_SocialNetwork));

  return json(installations_SocialNetwork);
};

// function SaveToken() {
//   useEffect(() => {
//     window.close();
//   }, []);

//   return <div>SaveToken</div>;
// }

// export default SaveToken;

// https://auto-testing-remix-js.vercel.app/oauth?#access_token=EAAK0ZCmon7L4BO5bYcZAMg8z5qgP5U9bj3L1ZB7ai52kbCklqOtmwSwZCQi9DZBvLZA7kVdpJc6xyXlAdSxK3Sm1jZBVBgljgSc3cJdmCZBjpsaQPz8GbgUmiT4QmtOZCgA4PClu0PxdvoXRqhMhsyZC2jIDZBqSTDTRgobn2sK3FZATM1ZBqpjbtLuHfHd6y1DRtBkVdKszOW9UttDkZD&data_access_expiration_time=1716490431&expires_in=3969
// http://localhost:3000/oauth?#access_token=EAAK0ZCmon7L4BO5bYcZAMg8z5qgP5U9bj3L1ZB7ai52kbCklqOtmwSwZCQi9DZBvLZA7kVdpJc6xyXlAdSxK3Sm1jZBVBgljgSc3cJdmCZBjpsaQPz8GbgUmiT4QmtOZCgA4PClu0PxdvoXRqhMhsyZC2jIDZBqSTDTRgobn2sK3FZATM1ZBqpjbtLuHfHd6y1DRtBkVdKszOW9UttDkZD&data_access_expiration_time=1716490431&expires_in=3969
// http://localhost:3000/api/save-token?access_token=EAAK0ZCmon7L4BO5bYcZAMg8z5qgP5U9bj3L1ZB7ai52kbCklqOtmwSwZCQi9DZBvLZA7kVdpJc6xyXlAdSxK3Sm1jZBVBgljgSc3cJdmCZBjpsaQPz8GbgUmiT4QmtOZCgA4PClu0PxdvoXRqhMhsyZC2jIDZBqSTDTRgobn2sK3FZATM1ZBqpjbtLuHfHd6y1DRtBkVdKszOW9UttDkZD
