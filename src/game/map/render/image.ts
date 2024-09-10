import { DEFAULT_IMAGE } from "./const";
import { EmptyRender } from "./image_types/empty";
import { Coord, DeleteRender } from "./impl";

export type ImageType = "static" | "translate";

export interface ImagePositionHandler {
  set(c: Coord): void;
  get(): Coord;
}

export class ImageStaticHandler implements ImagePositionHandler {
  img: HTMLImageElement;

  constructor(img: HTMLImageElement) {
    this.img = img;
  }

  set([x, y]: Coord): void {
    this.img.style.left =
      DEFAULT_IMAGE.offSet + y * parseInt(this.img.style.width) + "px";
    this.img.style.top =
      DEFAULT_IMAGE.offSet + x * parseInt(this.img.style.width) + "px";
  }

  get(): Coord {
    return [
      parseInt(this.img.style.left.split("px")[0]) - DEFAULT_IMAGE.offSet,
      parseInt(this.img.style.top.split("px")[0]) - DEFAULT_IMAGE.offSet,
    ];
  }
}

export class ImageTranslateHandler implements ImagePositionHandler {
  img: HTMLImageElement;

  constructor(img: HTMLImageElement) {
    this.img = img;
  }

  set([x, y]: Coord): void {
    this.img.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }

  get(): Coord {
    return [
      parseInt(this.img.style.transform.split("translateX(")[1].split("px")[0]),
      parseInt(this.img.style.transform.split("translateY(")[1].split("px")[0]),
    ];
  }
}

export interface IImage {
  defaultSize(): this;
  setSize(width: string, height: string): this;

  asElement(): HTMLImageElement;

  build(): this;
}

export class Image implements IImage, DeleteRender {
  img: HTMLImageElement;
  position: ImagePositionHandler;

  constructor(imagePath: string, x: number, y: number, type: ImageType) {
    this.img = document.createElement("img");
    this.img.src = imagePath;

    this.img.style.position = "absolute";

    this.position =
      type === "static"
        ? new ImageStaticHandler(this.img)
        : new ImageTranslateHandler(this.img);

    this.defaultSize();
    this.position.set([x, y]);
  }

  // TODO not default, arg
  defaultSize(): this {
    this.setSize(DEFAULT_IMAGE.width_px, DEFAULT_IMAGE.height_px);

    return this;
  }

  setSize(width: string, height: string): this {
    this.img.style.width = width;
    this.img.style.height = height;

    return this;
  }

  asElement() {
    return this.img;
  }

  // DELETE
  empty(): EmptyRender {
    const [x, y] = this.position.get();
    return new EmptyRender({ x, y });
  }

  build() {
    return this;
  }
}
