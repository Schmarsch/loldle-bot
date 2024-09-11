import type {
	ExtraInfo,
	Parser,
	ParserCategory,
	ParserExec,
} from "../types/parsers";

/**
 * Create a new parser object with the given name and exec function
 * @param name parser name identifier
 * @param exec parser execution function
 * @param extra extra information about the parser
 * @returns the parser object
 */
export function parser(
	name: string,
	exec: ParserExec,
	extra: ExtraInfo = {},
): Parser {
	return { name, exec, ...extra };
}

/**
 * Create a new category object with the given name and parsers
 * @param name category name identifier
 * @param parsers parsers in the category
 * @param extra extra information about the category
 * @returns the category object
 */
export function category(
	name: string,
	parsers: Parser[],
	extra: ExtraInfo = {},
): ParserCategory {
	return { name, parsers, ...extra };
}
