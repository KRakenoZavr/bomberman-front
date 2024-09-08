import { Websocket, WebsocketEvent, WebsocketEventMap } from "websocket-ts";
import { ENV, getEnv } from "../cfg/cfg";
import { IMap, Map } from "./map";
import { WS } from "./ws";
import { WsMapEventData } from "./ws/events";

export class Game {
  ws: WS;
  env: ENV;
  map: Map;

  constructor(map: IMap) {
    this.env = getEnv();
    this.ws = new WS(this.env.WS_URL, this.env.BACKOFF_TIMER);
    this.map = new Map(map);

    const event = (
      i: Websocket,
      ev: WebsocketEventMap[WebsocketEvent.message]
    ) => {
      this.map.handler.handle_event(
        this.map.getMap(),
        i,
        ev.data as WsMapEventData
      );
      this.render()
    };

    this.ws.addMessageListener(event);
  }

  render() {
    
  }
}
