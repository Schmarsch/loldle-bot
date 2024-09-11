import { getCategoryRoot } from "../../pages/help";
import { PromiseSlashCommandBuilder, command } from "../../utils";

const meta = PromiseSlashCommandBuilder(
	"help",
	"Get a list of all commands for the bot.",
);

export default command(meta, async ({ interaction }) => {
	await interaction.deferReply({ ephemeral: true });
	return interaction.editReply(getCategoryRoot());
});
