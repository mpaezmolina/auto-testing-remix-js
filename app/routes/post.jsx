import { json } from "@remix-run/node";
import { getPosts, markAllPostsAsSent } from "../dao";
import { instagramPublish } from "../fb";

export const loader = async () => {
  return json({ error: "Invalid request method" }, { status: 405 });
};

export const action = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const posts = await getPosts();
      let publications = [];

      if (posts !== null && posts.length > 0) {
        for (const post of posts) {
          const publicationId = await instagramPublish(
            post.imageUrl,
            post.text,
            post.installations_SocialNetworks.token
          );
          publications.push(publicationId);
        }

        markAllPostsAsSent();
      }

      return json(publications);
    }
  }
};
