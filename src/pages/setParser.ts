import { ButtonBuilder } from "@discordjs/builders";
import {
	ActionRowBuilder,
	ButtonStyle,
	EmbedBuilder,
	type InteractionReplyOptions,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { allCategories, getCategoryFromParser } from "../parser";
import { createId } from "../utils";

// Namespaces we will use
export const Namespaces = {
	parserSelect: "set_parser_select",
	categorySelect: "set_parser_category_select",
	parserAction: "set_parser_action",
};

// Actions we will use
export const Actions = {
	set: "+",
	delete: "-",
};

const N = Namespaces;
const A = Actions;

// a list of all categories as select menu options
const mappedCategories = allCategories.map(({ name, description, emoji }) =>
	new StringSelectMenuOptionBuilder({
		label: name,
		description,
		emoji,
		value: name,
	}).setDefault(false),
);

// a list of all parsers as select menu options
const mappedParsers = (category?: string) =>
	allCategories
		.find((cat) => cat.name === category)
		?.parsers.map(({ name, description, emoji }) => {
			return new StringSelectMenuOptionBuilder({
				label: name,
				description,
				emoji,
				value: name,
			}).setDefault(false);
		}) || [];

// Embed title
const TITLE = new EmbedBuilder()
	.setTitle("Set parser")
	.setDescription("Set the parser for this server.");

// Warning text for all ready set
const ALREADY_SET_TEXT = new EmbedBuilder()
	.setTitle("Warning")
	.setDescription("A parser is set already in this Channel.")
	.setColor("Red");

const PARSER_IS_NO_LONGER_AVAILABLE = new EmbedBuilder()
	.setTitle("Warning")
	.setDescription("This channel's parser is no longer available.")
	.setColor("Red");

// Generate root embed for Parser Category selection
export function getCategoryRoot(
	category?: string,
	alreadySet?: boolean,
	noLongerAvailable?: boolean,
): InteractionReplyOptions {
	// Create select menu for categories
	const selectCategoryId = createId(N.categorySelect);
	const selectCategory = new StringSelectMenuBuilder()
		.setCustomId(selectCategoryId)
		.setPlaceholder("Parser Category")
		.setMaxValues(1)
		.addOptions(mappedCategories);

	// Create select menu for parsers
	const selectParserId = createId(N.parserSelect, category);
	const selectParser = new StringSelectMenuBuilder()
		.setCustomId(selectParserId)
		.setPlaceholder("Parser")
		.setMaxValues(1)
		.addOptions(mappedParsers(category));

	// Set Button for setting the parser
	const buttonSetId = createId(N.parserAction, A.set);
	const buttonSet = new ButtonBuilder()
		.setCustomId(buttonSetId)
		.setLabel("Set Parser for this Channel")
		.setStyle(ButtonStyle.Success)
		.setDisabled(true);

	// Delete Button for deleting the parser
	const buttonDeleteId = createId(N.parserAction, A.delete);
	const buttonDelete = new ButtonBuilder()
		.setCustomId(buttonDeleteId)
		.setLabel("Delete Parser for this Channel")
		.setStyle(ButtonStyle.Danger)
		.setDisabled(!alreadySet);

	// Set the default category
	if (category) {
		selectCategory.setOptions(
			mappedCategories.map((option) => {
				if (option.data.value === category) {
					return option.setDefault(true);
				}
				return option.setDefault(false);
			}),
		);
	}

	const componentSelectCategory =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			selectCategory,
		);

	const componentSelectParser =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectParser);

	const componentActions = new ActionRowBuilder<ButtonBuilder>().addComponents(
		buttonSet,
		buttonDelete,
	);

	const embeds = [TITLE];
	if (alreadySet) {
		embeds.push(ALREADY_SET_TEXT);
	}
	if (noLongerAvailable) {
		embeds.push(PARSER_IS_NO_LONGER_AVAILABLE);
	}

	return {
		components: category
			? [componentSelectCategory, componentSelectParser, componentActions]
			: [componentSelectCategory],
		embeds,
	};
}

// Generate Parser and Category selection for setting the parser
export function getCategoryParsers(
	category: string,
	parser: string,
	alreadySet: boolean,
	has?: boolean,
	noLongerAvailable?: boolean,
): InteractionReplyOptions {
	// Check if the parser is already set and return the warning
	const warning = !has
		? ALREADY_SET_TEXT
		: new EmbedBuilder()
				.setTitle("Warning")
				.setDescription("This Selected Parser is already Set.")
				.setColor("Yellow");

	// Create select menu for categories
	const selectCategoryId = createId(N.categorySelect);
	const selectCategory = new StringSelectMenuBuilder()
		.setCustomId(selectCategoryId)
		.setPlaceholder("Parser Category")
		.setMaxValues(1)
		.addOptions(mappedCategories);

	// Create select menu for parsers
	const selectOptions = mappedParsers(category);
	const selectParserId = createId(N.parserSelect, category);
	const selectParser = new StringSelectMenuBuilder()
		.setCustomId(selectParserId)
		.setPlaceholder("Parser")
		.setMaxValues(1)
		.addOptions(selectOptions);

	// Set Button for setting the parser
	const buttonSetId = createId(N.parserAction, A.set, category, parser);
	const buttonSet = new ButtonBuilder()
		.setCustomId(buttonSetId)
		.setLabel("Set Parser for this Channel")
		.setStyle(ButtonStyle.Success)
		.setDisabled(has);

	// Delete Button for deleting the parser
	const buttonDeleteId = createId(N.parserAction, A.delete);
	const buttonDelete = new ButtonBuilder()
		.setCustomId(buttonDeleteId)
		.setLabel("Delete Parser for this Channel")
		.setStyle(ButtonStyle.Danger)
		.setDisabled(!alreadySet);

	// Set the default category
	selectCategory.setOptions(
		mappedCategories.map((option) => {
			if (option.data.value === category) {
				return option.setDefault(true);
			}
			return option.setDefault(false);
		}),
	);

	// Set the default parser
	selectParser.setOptions(
		mappedParsers(category).map((option) => {
			if (option.data.value === parser) {
				return option.setDefault(true);
			}
			return option.setDefault(false);
		}),
	);

	const componentSelectCategory =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			selectCategory,
		);

	const componentSelectParser =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectParser);

	const componentActions = new ActionRowBuilder<ButtonBuilder>().addComponents(
		buttonSet,
		buttonDelete,
	);

	const embeds = [TITLE];
	if (alreadySet) {
		embeds.push(warning);
	}
	if (noLongerAvailable) {
		embeds.push(PARSER_IS_NO_LONGER_AVAILABLE);
	}

	return {
		components: [
			componentSelectCategory,
			componentSelectParser,
			componentActions,
		],
		embeds,
	};
}
