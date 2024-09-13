# Loldle-Discord-Bot

A simple discord bot that tracks [Loldle](https://loldle.com)scores and maps them to a discord user.

Todos:

- [x] Track if a User posts a message with his lodle score of the day
- [x] Safe the score into a database
- [ ] Turn Repository into Monorepo to prepare for Webpage
- [ ] Add Webpage to see stats
  - [ ] Authenticate User with Discord OAuth
  - [ ] Display the last weeks scores
  - [ ] Display a Graph of the Users performance
  - [ ] Implement Mapping the Tracker to a specific Channel
- [ ] Expand into other **x** dles
  - [x] Worlde
  - [x] Wördle
  - [ ] Valdle
  - [ ] Pokedle
  - [ ] Minecraftle
  - [ ] ... (open for suggestions)

## How to write a new parse
Parsers can be found in the `src/parser` folder. The parsers are distributed in categories. Each category has a folder and the parsers are located in this folder.

Parsers can be created as follows:
```Typescript
import { parser } from "../../utils/parser"

// creation of a parser
export default parser("parsername", ({log, content})=>{
  return "parserstring"
})
```
A parser must be in a category!
This is then entered in the corresponding folder in `index.ts`.

## How to write a new parse category
Parser categories are important to keep an overview of the individual parsers. In addition to the gaming-specific **X** dles, there are also some that come from the original, such as Wordle.

A category can be added as follows:
```Typescript
import type { Parser } from "../../types/parsers";
import { category } from "../../utils/parser";
import parsername from "./parsername";

// add all parsers to the category
const all_parsers: Parser[] = [parsername];

// creation of a category
export default category("newcategory", all_parsers);
```
The category should then be added to the list in the file `./src/parser/index.ts` at the end.
