import { parser } from "../../utils/parser"

export default parser("loldle", ({content, log}) => {
    log("Parsing loldle");
    const lines = content.split("\n").slice(1, 6);
	const categories: string = lines.map((line) => {
		let [type, preScore] = line.split(": ");
		type = type.split(" ")[1].toLowerCase();
		const splitScore = preScore.split(" ");
		const score = Number.parseInt(splitScore[0]);
		const perfect = splitScore.length > 1;
		return `${type}:${score}:${perfect ? 1 : 0}`;
	}).join(",");
    return categories
})