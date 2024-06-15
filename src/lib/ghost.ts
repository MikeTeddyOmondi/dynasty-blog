import GhostContentAPI from "@tryghost/content-api";

export const ghostClient = new GhostContentAPI({
  url: import.meta.env.GHOST_API_URL,
  key: import.meta.env.GHOST_CONTENT_API_KEY,
  version: "v5.0",
});

export async function getPosts(): Promise<Post[]> {
  return ghostClient.posts
    .browse({ limit: "all" })
    .catch((e: any) =>
      console.error(`[Ghost] Error fetching posts: ${e.message}`)
    );
}

export async function getSinglePost(postSlug): Promise<Post> {
  return ghostClient.posts
    .read({ slug: postSlug })
    .catch((e: any) =>
      console.error(`[Ghost] Error fetching single post: ${e.message}`)
    );
}

type Post = {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id?: string;
  feature_image: string;
  featured?: boolean;
  visibility?: string;
  created_at?: typeof Date;
  updated_at: typeof Date;
  published_at: typeof Date;
  custom_excerpt?: null;
  codeinjection_head?: null;
  codeinjection_foot?: null;
  custom_template?: null;
  canonical_url?: null;
  url?: string;
  excerpt?: string;
  reading_time?: number;
  access?: boolean;
  comments?: boolean;
  og_image?: null;
  og_title?: null;
  og_description?: null;
  twitter_image?: null;
  twitter_title?: null;
  twitter_description?: null;
  meta_title?: null;
  meta_description?: null;
  email_subject?: null;
  frontmatter?: null;
  feature_image_alt?: null;
  feature_image_caption?: null;
};
