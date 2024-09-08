import { WsMapEventData } from "../ws/events/map_event";
import { Handler } from "./handler";

export type MapItem = "player" | "wall" | "empty";

export type IMap = MapItem[][];

export class Map {
  private map: IMap;
  private handler: Handler;

  constructor(map: IMap) {
    this.map = map;
    this.handler = new Handler();
  }

  handle(data: WsMapEventData) {
    this.handler.handle_event(this.map, data);
  }
}
