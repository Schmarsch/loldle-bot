import type { Parser } from "../../types/parsers";
import { category } from "../../utils/parser";
import woerdle from "./woerdle";
import wordle from "./wordle";

// All parsers in the category
const all_parsers: Parser[] = [wordle, woerdle];

/**
 * The gaming category.
 * All related gaming specific **X**dle parsers
 *
 * @type {Category}
 * @property {string} name The name of the category
 * @property {Parser[]} parsers The parsers in the category
 */
export default category("original", all_parsers, {
	description: "The original **X**dle parsers",
	emoji: "🔠",
});
