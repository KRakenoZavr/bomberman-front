import { MapItem } from ".";
import { BombType } from "../ws/events";

const ImagesPath = "../../assets/images/";

const C = {
  width_px: "20px",
  height_px: "20px",
  offSet: 10,
  width: 20,
};

export interface BoomRender {
  boom(type: BombType): void;
}

export interface DeathRender {
  death(): void;
}

export interface DeleteRender {
  empty(): void;
}

export interface MoveRender {
  move(x: number, y: number): void;
}

type Coord = [number, number];

export class Image implements DeleteRender {
  img: HTMLImageElement;
  type: "pos" | "tran";

  constructor(src: string, x: number, y: number, type: "pos" | "tran") {
    this.type = type;

    this.img = document.createElement("img");
    this.img.src = src;

    this.img.style.position = "absolute";

    if (type === "pos") {
      this.defaultPosition(x, y);
    } else if (type === "tran") {
      this.setTranslate(x, y);
    }
  }

  defaultSize(): this {
    this.setSize(C.width_px, C.height_px);

    return this;
  }

  defaultPosition(x: number, y: number): this {
    return this.setPosition(x, y, C.width);
  }

  setPosition(x: number, y: number, width: number): this {
    this.img.style.left = C.offSet + y * width + "px";
    this.img.style.top = C.offSet + x * width + "px";

    return this;
  }

  setTranslate(x: number, y: number): this {
    this.img.style.transform;
    this.img.style.transform = `translateX(${x}px) translateY(${y}px)`;

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

  getPosition(): Coord {
    return [
      parseInt(this.img.style.left.split("px")[0]) - C.offSet,
      parseInt(this.img.style.top.split("px")[0]) - C.offSet,
    ];
  }

  getTranslate(): Coord {
    return [
      parseInt(this.img.style.transform.split("translateX(")[1].split("px")[0]),
      parseInt(this.img.style.transform.split("translateY(")[1].split("px")[0]),
    ];
  }

  getCoord(): Coord {
    if (this.type === "pos") {
      return this.getPosition();
    }

    return this.getTranslate();
  }

  empty(): EmptyRender {
    return new EmptyRender(...this.getCoord());
  }

  build() {}
}

export class PlayerRender extends Image implements DeathRender, MoveRender {
  constructor(x: number, y: number) {
    super(ImagesPath + "player.png", x, y, "pos");
  }

  //   TODO
  death(): void {}

  //   TODO
  addAnimation(): this {
    return this;
  }

  move(x: number, y: number): void {
    this.setTranslate(x, y);
  }

  build(): void {
    this.defaultSize();
  }
}

export class WallRender extends Image implements DeathRender {
  constructor(x: number, y: number) {
    super(ImagesPath + "wall.png", x, y, "pos");
  }

  death(): void {}

  build(): void {
    this.defaultSize();
  }
}

export class EmptyRender extends Image {
  constructor(x: number, y: number) {
    super(ImagesPath + "player.png", x, y, "pos");
  }

  build(): void {
    this.defaultSize();
  }
}

export class PowerUpRender extends Image implements DeathRender {
  constructor(x: number, y: number) {
    super(ImagesPath + "power_up.png", x, y, "pos");
  }

  death(): void {}

  build(): void {
    this.defaultSize();
  }
}

export class BombRender extends Image implements DeathRender {
    constructor(x: number, y: number) {
      super(ImagesPath + "power_up.png", x, y, "pos");
    }
  
    death(): void {}
  
    build(): void {
      this.defaultSize();
    }
  }
  

export class Render {
  constructor() {}

  render(item: MapItem, x: number, y: number) {
    let render: EmptyRender;

    switch (item) {
      case "empty":
        render = new EmptyRender(x, y);
        break;
      case "player":
        render = new PlayerRender(x, y);
        break;
      case "wall":
        render = new WallRender(x, y);
        break;

      default:
        throw Error("not a item");
    }

    render.build();

    document.body.appendChild(render.asElement());

    return render;
  }
}
