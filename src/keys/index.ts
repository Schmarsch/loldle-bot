import type { Keys } from "../types";

const keys: Keys = {
  clientToken: Bun.env.CLIENT_TOKEN ?? "nil",
  testGuild: Bun.env.TEST_GUILD ?? "nil",
}

if (Object.values(keys).includes("nil")) {
  throw new Error("Not all ENV variables are set.");
}

export default keys;