import type {
	InteractionReplyOptions,
	WebhookMessageEditOptions,
} from "discord.js";
import { Colors } from "../utils";

export const Reply = {
	error(msg: string): InteractionReplyOptions {
		return {
			ephemeral: true,
			embeds: [{ color: Colors.error, description: msg }],
		};
	},
};

export const EditReply = {
	error(msg: string): WebhookMessageEditOptions {
		return {
			embeds: [{ color: Colors.error, description: msg }],
		};
	},
};
