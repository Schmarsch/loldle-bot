import { parser } from "../../utils/parser";

/**
 * The wordle parser for the website wordle
 * @param content The content of the message
 * @param log The logger function
 * @returns The result of the parser
 */
export default parser("wordle", ({content, log}) => {
    log("Parsing wordle", content);
    return "win"
},
{
    description: "the original wordle",
    emoji: "1282997096386920492"
}
);