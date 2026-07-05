import { config, collection, fields } from "@keystatic/core";

const isProd =
  process.env.NODE_ENV === "production" &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID;

export default config({
  storage: isProd
    ? {
        kind: "github",
        repo: { owner: "clarence-eng", name: "clar-earth-blog" },
      }
    : { kind: "local" },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        type: fields.select({
          label: "Type",
          defaultValue: "poem",
          options: [
            { label: "Poem", value: "poem" },
            { label: "Article", value: "article" },
            { label: "Photo Essay", value: "photo-essay" },
          ],
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "First line or short teaser shown on the homepage",
        }),
        dedication: fields.text({ label: "Dedication", validation: { isRequired: false } }),
        coAuthor: fields.text({ label: "Co-author", validation: { isRequired: false } }),
        lang: fields.text({ label: "Language tag (e.g. 中文)", validation: { isRequired: false } }),
        published: fields.checkbox({ label: "Published", defaultValue: true }),
        content: fields.mdx({
          label: "Content",
          extension: "mdx",
        }),
      },
    }),
  },
});
