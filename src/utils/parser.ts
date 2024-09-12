import { allCategories } from "../parser";
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

/**
 * Create a new parser category with the given name and parsers
 * @param name category name identifier
 * @param parsers parsers in the category
 * @returns id of the parser category
 */
export function createParserID(category: ParserCategory, parser: Parser): string {
	return `${category.name};${parser.name}`;
}

/**
 * Read the parser category and parser from the given id
 * @param id parser id
 * @returns the parser category and parser or undefined if not found
 */
export function readParserID(id: string): [ParserCategory, Parser] | undefined {
	const [categoryName, parserName] = id.split(";");
	const category = allCategories.find((category) => category.name === categoryName);
	const parser = category?.parsers.find((parser) => parser.name === parserName);
	if (!category || !parser) return undefined;
	return [category, parser];
}
