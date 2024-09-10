import { IMap } from "../../map";
import { Cmd } from "./commands";

export interface ChangeEventData {
  id: string;
  cmd: Cmd;
}

export interface ChangeEvent {
  type: "ChangeEvent";
  data: ChangeEventData;
}

export type LastAction = "" | "";

export interface LastActionEventData {
  keyCode: string;
  lastAction: LastAction;
}

export interface LastActionEvent {
  type: "LastActionEvent";
  data: LastActionEventData;
}

export interface SyncEvent {
  type: "SyncEvent";
  data: IMap;
}

export type WsMapEventData = ChangeEvent | LastActionEvent | SyncEvent;

export interface WsMapEvent {
  type: "WsMapEvent";
  data: WsMapEventData;
}
