import { PromiseSlashCommandBuilder, command } from "../../utils";

const meta = PromiseSlashCommandBuilder(
	"clear",
	"Clears the Channel"
);

export default command(meta, async ({ interaction }) => {
  await interaction.deferReply({ ephemeral: true });
  const channel = interaction.channel;
  if (channel) {
    const messages = await channel.messages.fetch();
    await Promise.all(messages.map((message) => message.delete()));
  }
  interaction.editReply({
    content: "Channel Cleared",
  });
  // wait for 5 seconds and then delete the reply
  return setTimeout(() => {
    interaction.deleteReply();
  }, 3000);
});