import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { postSchema } from "./src/lib/schema";

export default defineConfig({
  name: "shaffman",
  title: "Shaffman Studio",
  projectId: "ztozv5lg",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: [postSchema],
  },
});