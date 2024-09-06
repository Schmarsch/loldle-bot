import type { Event } from "../../types";
import commands from "./commands";
import help from "./help";

const events: Event<"interactionCreate">[] = [commands, help];

export default events;