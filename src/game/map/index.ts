import { Websocket, WebsocketEvent, WebsocketEventMap } from "websocket-ts";
import { WsMapEventData } from "../ws/events/map_event";
import { Handler } from "./handler";
import { Render } from "./render";

export type MapItemType =
  | "bomb"
  | "empty"
  | "player"
  | "wall"
  | "wallTwo"
  | "powerUp";

export type MapItem = { id?: string; type: MapItemType };

export type IMap = MapItem[][];

export class MapRender {
  private _map: IMap;
  private map: Render[][];
  private id_map: Map<string, Render>;

  constructor(map: IMap) {
    this.id_map = new Map();
    const mapper = (id: string, render: Render) => {
      this.id_map.set(id, render);
    };

    this.map = map.map((m, i1) =>
      m.map((v, i2) => {
        const r = new Render({ item: v.type, x: i1, y: i2 });
        mapper(v.id, r);
        return r;
      })
    );

    this._map = map;
  }

  get_render(x: number, y: number): Render {
    return this.map[x][y];
  }

  set_item(id: string, item: MapItem) {
    const [x, y] = this.id_map.get(id)?.render.position.get()!;
    const r = new Render({ item: item.type, x, y });

    this.map[x][y] = r;
    this.id_map.set(id, r);
  }

  set_item_idx(x: number, y: number, item: MapItem) {
    const r = new Render({ item: item.type, x, y });

    this.map[x][y] = r;
    this.id_map.set(item.id, r);
  }

  set_empty(id: string) {
    // this._map[x][y].type = "empty";
    this.id_map.get(id)?.empty();
  }

  get_by_id(id: string): Render {
    return this.id_map.get(id)!;
  }

  get_map(): IMap {
    return this._map;
  }
}

export class GameMap {
  private handler: Handler;
  private render: MapRender;

  constructor(map: IMap) {
    this.handler = new Handler();
    this.render = new MapRender(map);
  }

  handle(i: Websocket, ev: WebsocketEventMap[WebsocketEvent.message]) {
    this.handler.handle_event(this.render, i, ev.data as WsMapEventData);
  }

  getMap(): IMap {
    return this.render.get_map();
  }
}
