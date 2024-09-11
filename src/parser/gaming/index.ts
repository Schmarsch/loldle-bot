import type { Parser } from "../../types/parsers";
import { category } from "../../utils/parser";
import loldle from "./loldle";

// All parsers in the category
const all_parsers: Parser[] = [loldle];

/**
 * The gaming category.
 * All related gaming specific **X**dle parsers
 *
 * @type {Category}
 * @property {string} name The name of the category
 * @property {Parser[]} parsers The parsers in the category
 */
export default category("gaming", all_parsers, {
	description: "The gaming specific **X**dle parsers",
	emoji: "🎮",
});
