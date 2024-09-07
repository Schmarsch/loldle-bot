import type { Parser } from '../types/parsers';
import gaming from './gaming'

const allCategories = [gaming]
const allParsers = allCategories.flatMap(({ parsers }) => parsers);
const allParsersMap: Map<string, Parser> = (() => {
	const map = new Map<string, Parser>();
    allParsers.map((parser) => {
        map.set(parser.name, parser);
    });
	return map;
})();

export { allCategories, allParsers, allParsersMap }