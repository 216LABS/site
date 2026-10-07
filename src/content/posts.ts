// Writing section. Add a post by appending to `posts`. `body` is an array of
// blocks so posts stay server-rendered with no MDX dependency.
// Posts with draft: true are excluded from the index, sitemap and llms.txt.

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  summary: string; // answer-first: the post's conclusion in under 50 words
  date: string; // YYYY-MM-DD
  draft?: boolean;
  body: PostBlock[];
};

export const posts: Post[] = [];

export const publishedPosts = () =>
  posts.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = (slug: string) => publishedPosts().find((p) => p.slug === slug);
