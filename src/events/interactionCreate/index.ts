import type { Event } from "../../types";
import commands from "./commands";
import help from "./help";
import setParser from "./setParser";

const events: Event<"interactionCreate">[] = [commands, help, setParser];

export default events;