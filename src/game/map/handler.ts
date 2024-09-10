import { Websocket } from "websocket-ts";
import { IMap, MapItem, MapRender } from ".";
import {
  BombType,
  ChangeEventData,
  LastActionEventData,
  PowerUp,
  WsMapEventData,
} from "../ws/events";
import { BombRender } from "./render/image_types/bomb";
import { PowerUpRender } from "./render/image_types/power_up";
import { BoomRender, DeathRender } from "./render/impl";

interface MapChangeHander extends ChangeEventData {
  map: MapRender;
}

type MapChangeDefault = Omit<MapChangeHander, "cmd">;

export class ChangeHandler {
  constructor() {}

  handle({ map, cmd, id }: MapChangeHander) {
    switch (cmd.type) {
      case "Delete":
        this.delete({ map, id });
        break;
      case "PowerUp":
        this.powerUp({ map, id }, cmd.data);
        break;
      case "Death":
        this.death({ map, id });
        break;
      case "Place":
        this.place({ map, id }, cmd.data);
        break;
      case "Boom":
        this.boom({ map, id }, cmd.data);
        break;
      default:
        break;
    }
  }

  private log(dto: MapChangeDefault, ...msg: any[]) {
    console.log(`${msg}\n${dto}`);
  }

  // sets cell to empty
  private delete({ map, id }: MapChangeDefault) {
    this.log({ map, id }, "delete command:");
    map.set_empty(id);
  }

  // picked power up
  private powerUp({ map, id }: MapChangeDefault, payload: PowerUp) {
    this.log({ map, id }, `power_up command:\npayload: ${payload}`);

    const render = map.get_by_id(id).getRender() as PowerUpRender;
    render.animation(payload);
    this.log({ map, id }, `${payload} animation`);

    // switch (payload) {
    //   case "bomb":
    //     // TODO

    //     break;
    //   case "lifeUp":
    //     // TODO
    //     this.log({ map, id }, "lifeUp animation");
    //     break;
    //   default:
    //     break;
    // }
  }

  // death of item at coords
  private death({ map, id }: MapChangeDefault) {
    this.log({ map, id }, "death command:");
    // TODO
    map.get_by_id(id).death();
    this.log({ map, id }, "death animation");
  }

  // replace cell to other item
  private place({ map, id }: MapChangeDefault, item: MapItem) {
    this.log({ map, id }, `place command:\nitem: ${item}`);
    map.set_item(id, item);
  }

  // move player
  // private move_player({ map, id }: MapChangeDefault, item: MapItem) {
  //   this.log({ map, id }, `place command:\nitem: ${item}`);
  //   map.set_item(id, item);
  // }

  // bomb explosion at coords
  private boom({ map, id }: MapChangeDefault, type: BombType) {
    this.log({ map, id }, `boom command:\ntype: ${type}`);
    // TODO
    map.get_by_id(id).boom(type);
    this.log({ map, id }, "boom animation");
  }
}

export class Handler {
  private changeHandler: ChangeHandler;

  constructor() {
    this.changeHandler = new ChangeHandler();
  }

  private sync(mapRender: MapRender, map: IMap) {
    map.forEach((v, i1) =>
      v.forEach((_, i2) =>
        mapRender.get_render(i1, i2).getType() == map[i1][i2].type
          ? undefined
          : mapRender.set_item_idx(i1, i2, map[i1][i2])
      )
    );

    // map.forEach((v, i1) =>
    //   v.forEach((_, i2) => {
    //     let r = mapRender.get_render(i1, i2);
    //     if (map[i1][i2] != r.getType()) {
    //       mapRender.set_render(
    //         i1,
    //         i2,
    //         new Render({ item: map[i1][i2], x: i1, y: i2 })
    //       );
    //     }
    //   })
    // );
  }

  private change(map: MapRender, payload: ChangeEventData) {
    this.changeHandler.handle({ map, ...payload });
  }

  private lastAction(map: MapRender, data: LastActionEventData) {}

  handle_event(map: MapRender, i: Websocket, data: WsMapEventData) {
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
