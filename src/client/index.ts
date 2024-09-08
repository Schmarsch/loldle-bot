import { Client, GatewayIntentBits } from "discord.js";
import events from "../events";
import keys from "../keys";
import { registerEvents } from "../utils";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

const unused = 5;

registerEvents(client, events);

client.login(keys.clientToken).catch((err) => {
	console.error("[Login Error]", err);
	process.exit(1);
});
