import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "j917mw0p",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});