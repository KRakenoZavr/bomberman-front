export type PowerUp = "lifeUp" | "bomb";

export interface PowerUpCommand {
  type: "PowerUp";
  data: PowerUp;
}
