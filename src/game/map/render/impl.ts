import { BombType } from "../../ws/events";

export type Coord = [number, number];

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
  move(c: Coord): void;
}

export interface IRender
  extends BoomRender,
    DeathRender,
    DeleteRender,
    MoveRender {}
