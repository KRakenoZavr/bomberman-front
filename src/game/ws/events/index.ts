import { WsKeyEvent } from "./key_event";
import { WsMapEvent } from "./map_event";

export * from "./commands";
export * from "./key_event";
export * from "./map_event";

export type WsEventType = "WsKeyEvent" | "WsMapEvent";
export type WsData = WsKeyEvent | WsMapEvent;
