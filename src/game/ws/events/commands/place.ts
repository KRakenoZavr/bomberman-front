import { MapItem } from "../../../map";

export interface PlaceCommand {
  type: "Place";
  data: MapItem;
}
