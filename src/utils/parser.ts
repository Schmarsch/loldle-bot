import type { Category, Parser, ParserExec } from "../types/parsers";

/**
 * Create a new parser object with the given name and exec function
 * @param name parser name identifier
 * @param exec parser execution function
 * @returns the parser object
 */
export function parser(name: string, exec: ParserExec): Parser {
    return { name, exec };
}

/**
 * Create a new category object with the given name and parsers
 * @param name category name identifier
 * @param parsers parsers in the category
 * @returns the category object
 */
export function category(name: string, parsers: Parser[]): Category {
    return { name, parsers };
}