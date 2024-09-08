import { event } from "../../utils";
import { prisma } from "../../utils/prisma";

export default event("messageCreate", async (_, interaction) => {
	if (interaction.channel.id !== "1281719545953783889") return;

	const user = await prisma.user.upsert({
		where: { id: interaction.author.id },
		update: {},
		create: {
			id: interaction.author.id,
			name: interaction.author.username,
		},
	});

	const message = interaction.content;
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
	const loldledaily = await prisma.loldleDaily.findFirst({
		where: { date: today },
	});

	if (!loldledaily) {
		await prisma.loldleDaily.create({
			data: {
				date: today,
				userId: user.id,
				Categories: categories,
			},
		});
	}
});
