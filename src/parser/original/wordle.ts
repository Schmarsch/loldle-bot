import { parser } from "../../utils/parser";

/**
 * The wordle parser for the website wordle
 * @param content The content of the message
 * @param log The logger function
 * @returns The result of the parser
 */
export default parser(
	"wordle",
	({ content, log }) => {
		log("Parsing wordle:\n", content);
		const lines = content.split("\n");
		const titleInfos = lines[0].split(" ");
		const word = Number(titleInfos[1].replace(',', ''));
		const tries = Number(titleInfos[2].split("/")[0]);
		const guesses = lines.slice(2);

		// transform the guesses to the correct format
		// ⬛ or :black_large_square: to B
		// 🟨 or :yellow_square: to Y
		// 🟩 or :green_square: to G
		const formattedGuesses = guesses.map((guess) => {
			return guess
				.replace(/⬛|:black_large_square:/g, "B")
				.replace(/🟨|:yellow_square:/g, "Y")
				.replace(/🟩|:green_square:/g, "G");
		});
		return `word:${word},tries:${tries},guesses:${formattedGuesses.join(";")}`;
	},
	{
		description: "the original wordle",
		emoji: "1282997096386920492",
	},
);
