import { event } from "../../utils";
import { prisma } from "../../utils/prisma";
import { allParsersMap } from "../../parser";

export default event("messageCreate", async ({ log }, interaction) => {
	// search for the parserdle from channel in the database
	const parserDB = await prisma.parserdle.findFirst({
		where: { channelID: interaction.channel.id },
	});
	if (!parserDB) return;

	const user = await prisma.user.upsert({
		where: { id: interaction.author.id },
		update: {},
		create: {
			id: interaction.author.id,
			name: interaction.author.username,
		},
	});

	const message = interaction.content;

	// get the parser from the parserdle
	const parser = allParsersMap.get(parserDB.parserdleName);
	if (!parser) throw new Error("No Parser found ...");
	// execute the parser
	const result = parser.exec({
		async log(...args: unknown[]) {
			log(`[${parser.name}]`, ...args);
		},
		content: message,
	});

	const lines = message.split("\n").slice(1, 6);
	const categories: string = lines
		.map((line) => {
			let [type, preScore] = line.split(": ");
			type = type.split(" ")[1].toLowerCase();
			const splitScore = preScore.split(" ");
			const score = Number.parseInt(splitScore[0]);
			const perfect = splitScore.length > 1;
			return `${type}:${score}:${perfect ? 1 : 0}`;
		})
		.join(",");

	const today = new Date();
	// create new loldledaily but only if today is not already in the database
	const loldledaily = await prisma.xdleDaily.findFirst({
		where: { date: today },
	});

	if (!loldledaily) {
		await prisma.xdleDaily.create({
			data: {
				date: today,
				userId: user.id,
				Categories: result,
			},
		});
	}
});
