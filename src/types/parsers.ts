import type { LoggerFunction } from "./Logger";

export interface ParserProps {
    content: string;
	log: LoggerFunction;
}

export type ParserExec = (props: ParserProps) => string;

export interface Parser { 
    name: string;
    exec: ParserExec;
}

export interface Category {
    name: string;
    parsers: Parser[];
}