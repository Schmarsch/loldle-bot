import { SlashCommandBuilder } from "discord.js";
import type {
	Command,
	CommandAutocompleteExec,
	CommandCategory,
	CommandCategoryExtra,
	CommandExec,
	CommandMeta,
} from "../types";

export function command(
	meta: CommandMeta,
	exec: CommandExec,
	autocomplete?: CommandAutocompleteExec,
): Command {
	return { meta, exec, autocomplete };
}

export function PromiseSlashCommandBuilder(
	name: string,
	description: string,
): Promise<SlashCommandBuilder> {
	return Promise.resolve(
		new SlashCommandBuilder().setName(name).setDescription(description),
	);
}

export function category(
	name: string,
	commands: Command[],
	extra: CommandCategoryExtra = {},
): CommandCategory {
	return { name, commands, ...extra };
}
