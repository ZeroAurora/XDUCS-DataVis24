import { createClient } from "@clickhouse/client-web";

export const client = createClient({
  url: "http://localhost:8123",
});
