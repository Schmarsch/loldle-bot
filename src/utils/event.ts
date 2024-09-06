import type { Client } from "discord.js";
import type { Event, EventExec, EventKeys } from "../types";

export function event<T extends EventKeys>(
	id: T,
	exec: EventExec<T>,
): Event<T> {
	return { id, exec };
}

export async function registerEvents(
	client: Client,
	events: Event<EventKeys>[],
): Promise<void> {
	for (const event of events) {
		client.on(event.id, async (...args) => {
			// Create Props
			const props = {
				client,
				log: (...args: unknown[]) => console.log(`[${event.id}]`, ...args),
			};

			// Catch uncaught errors
			try {
				await event.exec(props, ...args);
			} catch (error) {
				props.log("Uncaught Error:", error);
			}
		});
	}
}
