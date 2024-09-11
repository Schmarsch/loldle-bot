import { getCategoryParsers, getCategoryRoot } from "../../pages/setParser";
import { getCategoryFromParser } from "../../parser";
import { PromiseSlashCommandBuilder, command } from "../../utils";
import { prisma } from "../../utils/prisma";

const meta = PromiseSlashCommandBuilder(
	"setparser",
	"Sets the parser for a specific channel",
);

export default command(meta, async ({ log, interaction }) => {
	await interaction.deferReply({ ephemeral: true });
	const channelId = interaction.channel?.id;
	const guildId = interaction.guild?.id;

	if (!channelId || !guildId)
		return interaction.editReply("Not in a guild channel");
	const parserDB = await prisma.parserdle.findFirst({
		where: {
			channelID: channelId,
		},
	});

	return parserDB
		? interaction.editReply(
				getCategoryParsers(
					getCategoryFromParser(parserDB.parserdleName),
					parserDB.parserdleName,
					true,
					true,
				),
			)
		: interaction.editReply(getCategoryRoot());
});
