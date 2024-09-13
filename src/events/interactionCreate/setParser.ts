import { EmbedBuilder, type StringSelectMenuInteraction } from "discord.js";
import {
	Actions,
	Namespaces,
	getCategoryParsers,
	getCategoryRoot,
} from "../../pages/setParser";
import { getCategoryFromParser } from "../../parser";
import { EditReply, Reply, event, readId } from "../../utils";
import { prisma } from "../../utils/prisma";

export default event("interactionCreate", async ({ log }, interaction) => {
	if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;
	if (!interaction.channel) return;
	if (!interaction.guild) return;

	const [namespace] = readId(interaction.customId);
	// If namespace not in setParser stop
	if (!Object.values(Namespaces).includes(namespace)) return;
	let parserdle = await prisma.parserdle.findFirst({
		where: {
			channelID: interaction.channel?.id,
		},
	});
	let noLongerAvailable = false;
	if (parserdle?.parserdleName) {
		const cat = getCategoryFromParser(parserdle.parserdleName);
		if (cat === "Unknown") {
			parserdle = null;
			noLongerAvailable = true;
		}
	}

	try {
		// Defer update
		await interaction.deferUpdate();

		switch (namespace) {
			case Namespaces.categorySelect: {
				const selectedCategory = (interaction as StringSelectMenuInteraction)
					.values[0];
				return interaction.editReply(
					getCategoryRoot(selectedCategory, !!parserdle, noLongerAvailable),
				);
			}
			case Namespaces.parserSelect: {
				const selectedParser = (interaction as StringSelectMenuInteraction)
					.values[0];
				const [_, interactionCategory] = readId(interaction.customId);
				const isSame = parserdle?.parserdleName === selectedParser;
				return interaction.editReply(
					getCategoryParsers(
						interactionCategory,
						selectedParser,
						!!parserdle,
						isSame,
						noLongerAvailable,
					),
				);
			}
			case Namespaces.parserAction: {
				const [__, action, category, parser] = readId(interaction.customId);
				if (action === Actions.set) {
					// Set the parser for the channel in the database
					const newParser = await prisma.parserdle.upsert({
						where: {
							channelID: interaction.channel.id,
						},
						update: {
							parserdleName: parser,
						},
						create: {
							channelID: interaction.channel.id,
							guildID: interaction.guild.id,
							parserdleName: parser,
						},
					});
					return interaction.editReply(
						getCategoryParsers(
							getCategoryFromParser(newParser.parserdleName),
							newParser.parserdleName,
							true,
							true,
						),
					);
				}
				if (action === Actions.delete) {
					// Delete the parser for the channel in the database
					await prisma.parserdle.delete({
						where: {
							channelID: interaction.channel.id,
						},
					});
					const embed = new EmbedBuilder()
						.setTitle("Parser Deleted")
						.setDescription("Parser has been deleted from this channel.")
						.setColor("Red");

					setTimeout(() => {
						interaction.deleteReply();
					}, 5000);

					return interaction.editReply({
						components: [],
						embeds: [embed],
					});
				}
				throw new Error("Invalid namespace reached ...");
			}
			default:
				throw new Error("Invalid namespace reached ...");
		}
	} catch (error) {
		log("[Set Parser Error]", error);
		if (interaction.deferred)
			return interaction.editReply(EditReply.error("Something went wrong"));
		return interaction.reply(Reply.error("Something went wrong :("));
	}
});
