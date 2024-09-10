import { getEnv } from "../../../../cfg/env";
import { DefaultRenderConstruct } from "../dto";
import { Image } from "../image";
import { DeathRender } from "../impl";

export class BombRender extends Image implements DeathRender {
  constructor({
    x,
    y,
    imagesPath = getEnv().IMAGES_PATH,
  }: DefaultRenderConstruct) {
    super(imagesPath + "bomb.png", x, y, "static");
  }

  // DEATH
  death(): void {}
}
