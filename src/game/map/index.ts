import { Websocket, WebsocketEvent, WebsocketEventMap } from "websocket-ts";
import { WsMapEventData } from "../ws/events/map_event";
import { Handler } from "./handler";

export type MapItem = "player" | "wall" | "empty";

export type IMap = MapItem[][];

export class Map {
  private map: IMap;
  handler: Handler;

  constructor(map: IMap) {
    this.map = map;
    this.handler = new Handler();
  }

  handle(i: Websocket, ev: WebsocketEventMap[WebsocketEvent.message]) {
    this.handler.handle_event(this.map, i, ev.data as WsMapEventData);
  }

  getMap(): IMap {
    return this.map;
  }
}
