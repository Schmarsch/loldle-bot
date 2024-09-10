import { PromiseSlashCommandBuilder, command } from "../../utils";
import { getCategoryFromParser } from "../../parser";
import { prisma } from "../../utils/prisma";
import { getCategoryParsers, getCategoryRoot } from "../../pages/setParser";

const meta = PromiseSlashCommandBuilder(
	"setparser",
	"Sets the parser for a specific channel"
)

export default command(meta, 
    async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true });
        const channelid = interaction.channel?.id;
        const guildid = interaction.guild?.id;

        if (!channelid || !guildid) return interaction.editReply("Not in a guild channel");

        const parserDB = await prisma.parserdle.findFirst({
            where: {
                channelID: channelid,
            }
        });

        return parserDB ?
            interaction.editReply(
                getCategoryParsers(
                    getCategoryFromParser(parserDB.parserdleName),
                    parserDB.parserdleName,
                    true,
                    true
                )
            ) :
            interaction.editReply(getCategoryRoot());
    }
);