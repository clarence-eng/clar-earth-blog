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
          validation: { isRequired: false },
        }),
        coverImage: fields.text({ label: "Cover Image path (e.g. /images/posts/name.jpg)", validation: { isRequired: false } }),
        dedication: fields.text({ label: "Dedication", validation: { isRequired: false } }),
        coAuthor: fields.text({ label: "Co-author", validation: { isRequired: false } }),
        lang: fields.text({ label: "Language tag (e.g. 中文)", validation: { isRequired: false } }),
        date: fields.text({ label: "Date (e.g. 2025-04)", validation: { isRequired: false } }),
        readingPhrase: fields.text({ label: "Reading phrase (e.g. 'a fire held between cupped hands')", validation: { isRequired: false } }),
        ladybugColor: fields.text({ label: "Ladybug cursor colour (hex, e.g. #E07030)", validation: { isRequired: false } }),
        published: fields.checkbox({ label: "Published", defaultValue: false }),
        mood: fields.multiselect({
          label: "Moods",
          description: "Primary mood first — drives cursor colour and mood tags",
          options: [
            { label: "Longing",    value: "longing" },
            { label: "Nature",     value: "nature" },
            { label: "Warmth",     value: "warmth" },
            { label: "Love",       value: "love" },
            { label: "Nostalgia",  value: "nostalgia" },
            { label: "Melancholy", value: "melancholy" },
            { label: "Protest",    value: "protest" },
            { label: "Solidarity", value: "solidarity" },
            { label: "Reverence",  value: "reverence" },
            { label: "Bitterness", value: "bitterness" },
          ],
        }),
        content: fields.mdx({
          label: "Content",
          extension: "mdx",
        }),
      },
    }),
  },
});
