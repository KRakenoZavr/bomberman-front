import { Websocket } from "websocket-ts";
import { IMap, MapItem } from ".";
// import { ChangeEventData } from "../ws/events";
import {
  BombType,
  ChangeEventData,
  LastActionEventData,
  PowerUp,
  WsMapEventData,
} from "../ws/events";

interface MapChangeHander extends ChangeEventData {
  map: IMap;
}

type MapChangeDefault = Omit<MapChangeHander, "cmd">;

export class ChangeHandler {
  constructor() {}

  handle({ map, cmd, x, y }: MapChangeHander) {
    switch (cmd.type) {
      case "Delete":
        this.delete({ map, x, y });
        break;
      case "PowerUp":
        this.powerUp({ map, x, y }, cmd.data);
        break;
      case "Death":
        this.death({ map, x, y });
        break;
      case "Place":
        this.place({ map, x, y }, cmd.data);
        break;
      case "Boom":
        this.boom({ map, x, y }, cmd.data);
        break;
      default:
        break;
    }
  }

  private log(dto: MapChangeDefault, ...msg: any[]) {
    console.log(`${msg}\n${dto}`);
  }

  private delete({ map, x, y }: MapChangeDefault) {
    this.log({ map, x, y }, "delete command:");
    map[x][y] = "empty";
  }

  private powerUp({ map, x, y }: MapChangeDefault, payload: PowerUp) {
    this.log({ map, x, y }, `power_up command:\npayload: ${payload}`);
    switch (payload) {
      case "bomb":
        // TODO
        this.log({ map, x, y }, "bomb animation");
        break;
      case "lifeUp":
        // TODO
        this.log({ map, x, y }, "lifeUp animation");
        break;
      default:
        break;
    }
  }

  private death({ map, x, y }: MapChangeDefault) {
    this.log({ map, x, y }, "death command:");
    // TODO
    this.log({ map, x, y }, "death animation");
  }

  private place({ map, x, y }: MapChangeDefault, item: MapItem) {
    this.log({ map, x, y }, `place command:\nitem: ${item}`);
    map[x][y] = item;
  }

  private boom({ map, x, y }: MapChangeDefault, type: BombType) {
    this.log({ map, x, y }, `boom command:\ntype: ${type}`);
    // TODO
    this.log({ map, x, y }, "death animation");
  }
}

export class Handler {
  private changeHandler: ChangeHandler;

  constructor() {
    this.changeHandler = new ChangeHandler();
  }

  private sync(map1: IMap, map2: IMap) {
    map1.forEach((v, i) => v.forEach((_, i2) => (map1[i][i2] = map2[i][i2])));
  }

  private change(map: IMap, payload: ChangeEventData) {
    this.changeHandler.handle({ map, ...payload });
  }

  private lastAction(map: IMap, data: LastActionEventData) {}

  handle_event(map: IMap, i: Websocket, data: WsMapEventData) {
    switch (data.type) {
      case "ChangeEvent":
        this.change(map, data.data);
        break;

      case "LastActionEvent":
        this.lastAction(map, data.data);
        break;
      case "SyncEvent":
        this.sync(map, data.data);
        break;

      default:
        break;
    }
  }
}
