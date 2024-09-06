import type { CommandCategory } from "../types";
import debug from "./debug";
import general from "./general"

const all_categories: CommandCategory[] = [general];
if (Bun.env.NODE_ENV !== "production") {
  all_categories.push(debug);
}

export default all_categories;