import { ENV, getEnv } from "../cfg/cfg";
import { IMap, Map } from "./map";
import { WS } from "./ws";

export class Game {
  ws: WS;
  env: ENV;
  map: Map;

  constructor(map: IMap) {
    this.env = getEnv();
    this.ws = new WS(this.env.WS_URL, this.env.BACKOFF_TIMER);
    this.map = new Map(map);

    this.ws.addMessageListener(this.map.handler)
  }
}
