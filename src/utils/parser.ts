import type { Category, Parser, ParserExec } from "../types/parsers";

export function parser(name: string, exec: ParserExec): Parser {
    return { name, exec };
}

export function category(name: string, parsers: Parser[]): Category {
    return { name, parsers };
}