import { json } from "@remix-run/node";

export const loader = async () => {
  return json({ error: "Invalid request method" }, { status: 405 });
};

export const action = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const body = await request.json();
      return body;
    }
  }
};
