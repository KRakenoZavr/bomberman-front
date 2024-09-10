export type BombType = "Standard" | "Flame";

export interface BoomCommand {
  type: "Boom";
  data: BombType;
}
