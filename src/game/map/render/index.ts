import { MapItemType } from "..";
import { BombType } from "../../ws/events";
import { DefaultRenderConstruct } from "./dto";
import { Image } from "./image";
import { BombRender } from "./image_types/bomb";
import { EmptyRender } from "./image_types/empty";
import { PlayerRender } from "./image_types/player";
import { PowerUpRender } from "./image_types/power_up";
import { WallRender } from "./image_types/wall";
import { WallTwoRender } from "./image_types/wall_two";
import { BoomRender, DeathRender } from "./impl";

export type RenderConstruct = { item: MapItemType } & DefaultRenderConstruct;

const instanceOfDeath = (object: any): object is DeathRender =>
  "death" in (object as Image);
const instanceOfBoom = (object: any): object is BoomRender =>
  "boom" in (object as Image);

export class Render {
  render: Image;
  type: MapItemType;

  constructor({ item, x, y, imagesPath }: RenderConstruct) {
    this.type = item;

    let args: DefaultRenderConstruct = {
      x,
      y,
      imagesPath,
    };

    switch (item) {
      case "bomb":
        this.render = new BombRender(args);
        break;

      case "empty":
        this.render = new EmptyRender(args);
        break;

      case "player":
        this.render = new PlayerRender(args);
        break;

      case "wall":
        this.render = new WallRender(args);
        break;

      case "wallTwo":
        this.render = new WallTwoRender(args);
        break;

      case "powerUp":
        this.render = new PowerUpRender(args);
        break;

      default:
        throw Error("not a item");
    }

    this.render.build();

    document.body.appendChild(this.render.asElement());
  }

  empty() {
    this.render = this.render.empty();
  }

  death() {
    if (instanceOfDeath(this.render)) {
      this.render.death();
    }
  }

  boom(type: BombType) {
    if (instanceOfBoom(this.render)) {
      this.render.boom(type);
    }
  }

  getRender(): Image {
    return this.render;
  }

  getType(): MapItemType {
    return this.type;
  }
}
