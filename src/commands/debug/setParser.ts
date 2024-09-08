import { PromiseSlashCommandBuilder, command } from "../../utils";
import { allParsers } from "../../parser";
import { prisma } from "../../utils/prisma";

const list = allParsers.map((parser) => {
    return {
        name: parser.name,
        value: parser.name,
    };
})

const meta = PromiseSlashCommandBuilder(
	"setparser",
	"Sets the parser for a specific channel"
).then((builder) => {
    return builder.addStringOption((option) =>
        option
            .setName("parser")
            .setDescription("The parser to use")
            .setRequired(true)
            .addChoices(list)
    )
})

export default command(meta, 
    async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true });
        const parser = interaction.options.getString("parser");
        const channelid = interaction.channel?.id;
        const guildid = interaction.guild?.id;

        if (!channelid || !guildid) return interaction.editReply("Not in a guild channel");
        if (!parser) return interaction.editReply("No parser provided");

        const parserDB = await prisma.parserdle.upsert({
            where: {
                channelID: channelid,
            },
            update: {
                parserdleName: parser,
            },
            create: {
                channelID: channelid,
                guildID: guildid,
                parserdleName: parser,
            }
        });

        return interaction.editReply(`${parserDB.parserdleName} set as parser for this channel`);
    }
);