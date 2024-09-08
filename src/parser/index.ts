import type { Parser } from '../types/parsers';
import gaming from './gaming'

/**
 * list of all categories
 */
const allCategories = [gaming]

/**
 * list of all parsers
 */
const allParsers = allCategories.flatMap(({ parsers }) => parsers);

/**
 * map of all parsers by name
 */
const allParsersMap: Map<string, Parser> = (() => {
	const map = new Map<string, Parser>();
    allParsers.map((parser) => {
        map.set(parser.name, parser);
    });
	return map;
})();

export { allCategories, allParsers, allParsersMap }