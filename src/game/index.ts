import { Websocket, WebsocketEvent, WebsocketEventMap } from "websocket-ts";
import { ENV, getEnv } from "../cfg/env";
import { GameMap, IMap } from "./map";
import { WS } from "./ws";

export class Game {
  ws: WS;
  env: ENV;
  map: GameMap;

  constructor(map: IMap) {
    this.env = getEnv();
    this.ws = new WS(this.env.WS_URL, this.env.BACKOFF_TIMER);
    this.map = new GameMap(map);

    const event = (
      i: Websocket,
      ev: WebsocketEventMap[WebsocketEvent.message]
    ) => {
      this.map.handle(i, ev.data);
      this.render();
    };

    this.ws.addMessageListener(event);
  }

  render() {}
}
