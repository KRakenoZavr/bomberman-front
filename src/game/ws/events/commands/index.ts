import { BoomCommand } from "./boom";
import { DeathCommand } from "./death";
import { DeleteCommand } from "./delete";
import { PlaceCommand } from "./place";
import { PowerUpCommand } from "./power_up";

export * from "./boom"
export * from "./death"
export * from "./delete"
export * from "./place"
export * from "./power_up"

export type Cmd =
  | DeleteCommand
  | PowerUpCommand
  | DeathCommand
  | PlaceCommand
  | BoomCommand

export type MapChangeCommand =
  | "Delete"
  | "PowerUp"
  | "Death"
  | "Place"
  | "Boom";
