import type { Parser } from '../types/parsers';
import gaming from './gaming'
import original from './original';

/**
 * list of all categories
 */
const allCategories = [gaming, original]

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

/**
 * Get the category of a parser
 * 
 * @param parserName name of the parser
 * @returns the category of the parser
 */
function getCategoryFromParser(parserName: string): string {
    for(const category of allCategories){
        for(const parser of category.parsers){
            if(parser.name === parserName){
                return category.name;
            }
        }
    }
    return "Unknown";
}

export { allCategories, allParsers, allParsersMap, getCategoryFromParser}