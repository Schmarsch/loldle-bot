import type { Awaitable, Client, ClientEvents } from "discord.js";
import type { LoggerFunction } from "./Logger";

export interface EventProps {
	client: Client;
	log: LoggerFunction;
}

export type EventKeys = keyof ClientEvents;
export type EventExec<T extends EventKeys> = (
	props: EventProps,
	...args: ClientEvents[T]
) => Awaitable<unknown>;
export interface Event<T extends EventKeys> {
	id: T;
	exec: EventExec<T>;
}
