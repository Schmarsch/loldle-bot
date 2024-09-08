import type { StringSelectMenuInteraction } from "discord.js";
import { Namespaces, getCategoryPage, getCategoryRoot } from "../../pages/help";
import { EditReply, Reply, createId, event, readId } from "../../utils";

export default event("interactionCreate", async ({ log }, interaction) => {
	if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

	const [namespace] = readId(interaction.customId);

	// If namespace not in help pages stop
	if (!Object.values(Namespaces).includes(namespace)) return;

	try {
		// Defer update
		await interaction.deferUpdate();

		switch (namespace) {
			case Namespaces.root:
				return await interaction.editReply(getCategoryRoot());
			case Namespaces.select: {
				const newId = createId(
					Namespaces.select,
					(interaction as StringSelectMenuInteraction).values[0],
				);
				return await interaction.editReply(await getCategoryPage(newId));
			}
			case Namespaces.action:
				return await interaction.editReply(
					await getCategoryPage(interaction.customId),
				);
			default:
				throw new Error("Invalid namespace reached ...");
		}
	} catch (error) {
		log("[Help Error]", error);

		if (interaction.deferred)
			return interaction.editReply(EditReply.error("Something went wrong"));

		return interaction.reply(Reply.error("Something went wrong :("));
	}
});
