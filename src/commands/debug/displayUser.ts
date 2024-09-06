import { PromiseSlashCommandBuilder, command } from "../../utils";
import { prisma } from "../../utils/prisma";

const meta = PromiseSlashCommandBuilder(
	"getusers",
	"Gets all User saved in the Database",
);

export default command(meta, async ({ interaction }) => {
	await interaction.deferReply({ ephemeral: true });

  const users = await prisma.user.findMany()
  const content = users.map((user) => `${user.name} (${user.id})`).join(", ")

  return interaction.editReply({
    content: content.length > 0 ? content : "No users found in the database.",
  })
});
