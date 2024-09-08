export interface WsKeyEventData {
  keyCode: string;
  success: boolean;
}

export interface WsKeyEvent {
  type: "WsKeyEvent";
  data: WsKeyEventData;
}
