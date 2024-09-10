import { getEnv } from "../../../../cfg/env";
import { DefaultRenderConstruct } from "../dto";
import { Image } from "../image";
import { Coord, DeathRender, MoveRender } from "../impl";

export class PlayerRender extends Image implements DeathRender, MoveRender {
  constructor({
    x,
    y,
    imagesPath = getEnv().IMAGES_PATH,
  }: DefaultRenderConstruct) {
    super(imagesPath + "player.png", x, y, "translate");
  }

  // DEATH
  //   TODO
  death(): void {}

  // MOVE
  move(c: Coord): void {
    this.position.set(c);
  }

  //   TODO
  addAnimation(): this {
    return this;
  }
}
