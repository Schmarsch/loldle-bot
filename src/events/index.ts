import type { Event } from "../types";
import ready from "./ready";
import interactionCreate from "./interactionCreate";
import messageCreate from "./messageCreate";

// biome-ignore lint/suspicious/noExplicitAny: Honestly dont know why this is any but i dont know what else to use currently so its still a TODO
const events: Event<any>[] = [...interactionCreate, ready, messageCreate];

export default events;
