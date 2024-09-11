import { allParsersMap } from "../../parser";
import { event } from "../../utils";
import { prisma } from "../../utils/prisma";

export default event("messageCreate", async ({ log }, interaction) => {
	// search for the parserdle from channel in the database
	const parserDB = await prisma.parserdle.findFirst({
		where: { channelID: interaction.channel.id },
	});
	if (!parserDB) return;

	// search for the user in the database and create if not found
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

	const today = new Date();

	log("Parsing result", result);

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
