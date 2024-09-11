import type { LoggerFunction } from "./Logger";

/**
 * The props that are passed to the parser
 * @typedef {Object} ParserProps
 * @property {string} content The content of the message
 * @property {LoggerFunction} log The logger function
 */
export interface ParserProps {
	content: string;
	log: LoggerFunction;
}

/**
 * The function that is executed by the parser
 * @typedef {Function} ParserExec
 * @param {ParserProps} props The props that are passed to the parser
 * @returns {string} The result of the parser
 */
export type ParserExec = (props: ParserProps) => string;

/**
 * This is for more information about the parser or category
 * @typedef {Object} ExtraInfo
 * @property {string} description The description of the parser or category
 * @property {string} emoji The emoji of the parser or category
 */
export interface ExtraInfo {
	description?: string;
	emoji?: string;
}

/**
 * The parser
 * @typedef {Object} Parser
 * @property {string} name The name of the parser
 * @property {ParserExec} exec The function that is executed by the parser
 */
export interface Parser extends ExtraInfo {
	name: string;
	exec: ParserExec;
}

/**
 * The category
 * @typedef {Object} Category
 * @property {string} name The name of the category
 * @property {Parser[]} parsers The parsers in the category
 */
export interface ParserCategory extends ExtraInfo {
	name: string;
	parsers: Parser[];
}
