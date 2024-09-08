export type BombType = "Single" | "Double";

export interface BoomCommand {
  type: "Boom";
  data: BombType;
}
