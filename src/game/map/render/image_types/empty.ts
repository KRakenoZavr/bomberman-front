import { getEnv } from "../../../../cfg/env";
import { DefaultRenderConstruct } from "../dto";
import { Image } from "../image";

export class EmptyRender extends Image {
  constructor({
    x,
    y,
    imagesPath = getEnv().IMAGES_PATH,
  }: DefaultRenderConstruct) {
    super(imagesPath + "empty.png", x, y, "static");
  }
}
