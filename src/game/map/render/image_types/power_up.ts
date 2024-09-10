import { getEnv } from "../../../../cfg/env";
import { PowerUp } from "../../../ws/events";
import { DefaultRenderConstruct } from "../dto";
import { Image } from "../image";
import { DeathRender } from "../impl";

export class PowerUpRender extends Image implements DeathRender {
  constructor({
    x,
    y,
    imagesPath = getEnv().IMAGES_PATH,
  }: DefaultRenderConstruct) {
    super(imagesPath + "power_up.png", x, y, "static");
  }

  addAnimation(): this {
    return this;
  }

  // TODO
  private bombAnimation() {}
  // TODO
  private lifeUpAnimation() {}

  animation(payload: PowerUp) {
    if (payload === "bomb") {
      this.bombAnimation();
    } else if (payload === "lifeUp") {
      this.lifeUpAnimation();
    } else {
      return;
    }
    return;
  }

  // DEATH
  death(): void {}
}
