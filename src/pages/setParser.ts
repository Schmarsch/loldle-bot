import { ActionRowBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, type InteractionReplyOptions } from "discord.js";
import { allCategories, getCategoryFromParser } from "../parser";
import { category, createId } from "../utils";
import { ButtonBuilder } from "@discordjs/builders";

// Namespaces we will use
export const Namespaces = {
	parserSelect: "set_parser_parser_select",
	categorySelect: "set_parser_category_select",
    parserAction: "set_parser_parser_action",
};

// Actions we will use
export const Actions = {
    set: "setParser",
    delete: "deleteParser",
};

const N = Namespaces
const A = Actions

// a list of all categories as select menu options
const mappedCategories = allCategories.map(
    ({ name, description, emoji }) =>
        new StringSelectMenuOptionBuilder({
            label: name,
            description,
            emoji,
            value: name,
        }),
);

// a list of all parsers as select menu options
const mappedParsers = (category?: string) => allCategories.find((cat) => cat.name === category)?.parsers.map(
    ({ name, description, emoji }) =>
        new StringSelectMenuOptionBuilder({
            label: name,
            description,
            emoji,
            value: name,
        }),
) || [];

// Embed title
const TITLE = new EmbedBuilder()
		.setTitle("Set Parser")
		.setDescription("Set the Parser for this server.");

// Generate root embed for help paginator
export function getCategoryRoot(category?: string): InteractionReplyOptions {

	// Create select menu for categories
	const selectCategoryId = createId(N.categorySelect);
	const selectCategory = new StringSelectMenuBuilder()
		.setCustomId(selectCategoryId)
		.setPlaceholder("Parser Category")
		.setMaxValues(1)
		.addOptions(mappedCategories);

    const selectParserId = createId(N.parserSelect, category);
    const selectParser = new StringSelectMenuBuilder()
        .setCustomId(selectParserId)
        .setPlaceholder("Parser")
        .setMaxValues(1)
        .addOptions(mappedParsers(category));

    const buttonSetId = createId(N.parserAction, A.set);
    const buttonSet = new ButtonBuilder()
        .setCustomId(buttonSetId)
        .setLabel("Set Parser for this Channel")
        .setStyle(ButtonStyle.Success)
        .setDisabled(true);

    const buttonDeleteId = createId(N.parserAction, A.delete);
    const buttonDelete = new ButtonBuilder()
        .setCustomId(buttonDeleteId)
        .setLabel("Delete Parser for this Channel")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true);
    
    if(category){
        selectCategory.setOptions(mappedCategories.map((option) => {
            if(option.data.value === category){
                return option.setDefault(true);
            }
            return option.setDefault(false);
        }));
    }

	const componentSelectCategory =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            selectCategory
        );
    
    const componentSelectParser =
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            selectParser
        );
    
    const componentActions = new ActionRowBuilder<ButtonBuilder>().addComponents(
        buttonSet,
        buttonDelete
    );

	return {
        components: category ? [componentSelectCategory, componentSelectParser, componentActions] : [componentSelectCategory],
		embeds: [TITLE],
	};
}

export function getCategoryParsers(category: string, parser: string, allReadySet: boolean, has?: boolean): InteractionReplyOptions {

    const warning = !has ? 
        new EmbedBuilder()
        .setTitle("Warning")
        .setDescription("A parser is set already in this Channel.")
        .setColor("Red") : 
        new EmbedBuilder()
        .setTitle("Warning")
        .setDescription("This parser is already set in this Channel.")
        .setColor("Yellow");

	// Create select menu for categories
	const selectCategoryId = createId(N.categorySelect);
	const selectCategory = new StringSelectMenuBuilder()
		.setCustomId(selectCategoryId)
		.setPlaceholder("Parser Category")
		.setMaxValues(1)
		.addOptions(mappedCategories);

    const selectParserId = createId(N.parserSelect);
    const selectParser = new StringSelectMenuBuilder()
        .setCustomId(selectParserId)
        .setPlaceholder("Parser")
        .setMaxValues(1)
        .addOptions(mappedParsers(category));

    const buttonSetId = createId(N.parserAction, A.set, category, parser);
    const buttonSet = new ButtonBuilder()
        .setCustomId(buttonSetId)
        .setLabel("Set Parser for this Channel")
        .setStyle(ButtonStyle.Success)
        .setDisabled(has);

    const buttonDeleteId = createId(N.parserAction, A.delete);
    const buttonDelete = new ButtonBuilder()
        .setCustomId(buttonDeleteId)
        .setLabel("Delete Parser for this Channel")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(!allReadySet);
    
    selectCategory.setOptions(mappedCategories.map((option) => {
        if(option.data.value === category){
            return option.setDefault(true);
        }
        return option.setDefault(false);
    }));

    selectParser.setOptions(mappedParsers(category).map((option) => {
        if(option.data.value === parser){
            return option.setDefault(true);
        }
        return option.setDefault(false);
    }));

	const componentSelectCategory =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            selectCategory
        );
    
    const componentSelectParser =
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            selectParser
        );
    
    const componentActions = new ActionRowBuilder<ButtonBuilder>().addComponents(
        buttonSet,
        buttonDelete
    );
    
    return {
        components: [componentSelectCategory, componentSelectParser, componentActions],
		embeds: allReadySet ? [TITLE,  warning] : [TITLE],
	};

}