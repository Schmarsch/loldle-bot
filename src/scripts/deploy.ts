import { REST, Routes, type APIUser } from "discord.js";
import commands from "../commands";
import keys from "../keys";

const body = Promise.all(
	commands.flatMap(({ commands }) => commands.map(async ({ meta }) => meta)),
);

const rest = new REST({ version: "10" }).setToken(keys.clientToken);

async function main() {
	const currentUser = (await rest.get(Routes.user())) as APIUser;

	const endpoint =
		Bun.env.NODE_ENV === "production"
			? Routes.applicationCommands(currentUser.id)
			: Routes.applicationGuildCommands(currentUser.id, keys.testGuild);

	const awaitBody = await body;

	await rest.put(endpoint, { body: awaitBody });

	return currentUser;
}

main()
	.then((user) => {
		const tag = `${user.username}#${user.discriminator}`;
		const response =
			Bun.env.NODE_ENV === "production"
				? `Successfully released commands in production as ${tag}!`
				: `Successfully registered commands for development in ${keys.testGuild} as ${tag}!`;

		console.log(response);
	})
	.catch(console.error);
