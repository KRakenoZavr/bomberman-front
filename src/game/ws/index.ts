import {
  ArrayQueue,
  ConstantBackoff,
  ReconnectEventDetail,
  RetryEventDetail,
  Websocket,
  WebsocketBuilder,
  WebsocketEvent,
  WebsocketEventListener,
  WebsocketEventMap,
} from "websocket-ts";

// const ws = new WebsocketBuilder("ws://localhost:8080")
//     .withBuffer(new ArrayQueue()).withBackoff(new ConstantBackoff(1000))
//     .onOpen((i, ev) => console.log("opened"))
//     .onClose((i, ev) => console.log("closed"))
//     .onError((i, ev) => console.log("error"))
//     .onMessage((i, ev) => console.log("message"))
//     .onRetry((i, ev) => console.log("retry"))
//     .onReconnect((i, ev) => console.log("reconnect"))
//     .build();

// ws.send("hello");

// const isMapEvent = (data: WsData): data is WsMapEvent => data.type === "WsMapEvent"

// export interface WsData {
//     type: WsDataType
//     data:
// }

const onOpen = (i: Websocket, ev: Event) => console.log("websocket success");

const onClose = (i: Websocket, ev: CloseEvent) =>
  console.log(`websocket close:\nreason: ${ev.reason}\nclean: ${ev.wasClean}`);

const onError = (i: Websocket, ev: Event) =>
  console.log("webscoket error: ", ev);

// const mapHandler = (data: WsMapEventData) => console.log(data);
// const keyHandler = (data: WsKeyEventData) => console.log(data);

// const onMessage = ((i: Websocket, { data }: MessageEvent<WsData>) => isMapEvent(data) ? mapHandler(data.data) : keyHandler(data.data))
// const onMessage = (i: Websocket, { data }: MessageEvent<WsData>) => {
//   switch (data.type) {
//     case "WsKeyEvent":
//       keyHandler(data.data);
//       break;

//     case "WsMapEvent":
//       mapHandler(data.data);
//       break;
//     default:
//       break;
//   }
// };

// const onMessage = ((i: Websocket, ev: MessageEvent<any>) => {
//     const data = ev.data.data
//     if (isMapEvent(ev.data)) {
//         mapHandler(data)
//     } else {
//         const data = ev.data.data
//         keyHandler(data)
//     }
// })

const onRetry = (i: Websocket, ev: CustomEvent<RetryEventDetail>) =>
  console.log(`websocket retry: ${ev.detail}`);

const onReconnect = (i: Websocket, ev: CustomEvent<ReconnectEventDetail>) =>
  console.log(`websocket reconnect: ${ev.detail}`);

export class WS {
  private ws: Websocket;

  constructor(url: string, timer: number) {
    this.ws = new WebsocketBuilder(url)
      .withBuffer(new ArrayQueue())
      .withBackoff(new ConstantBackoff(timer))
      .onOpen(onOpen)
      .onClose(onClose)
      .onError(onError)
      // .onMessage(onMessage)
      .onRetry(onRetry)
      .onReconnect(onReconnect)
      .build();
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.ws.send(data);
  }

  addMessageListener(
    event: (i: Websocket, ev: WebsocketEventMap[WebsocketEvent.message]) => void
  ) {
    this.ws.addEventListener(WebsocketEvent.message, event);
  }
}
