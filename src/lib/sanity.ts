import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ztozv5lg",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});