export type History = {
  internal: Array<Array<string>>;
  visible: Array<Array<string>>;
};

export enum EventDataTypes {
  TEXT_STREAM = "text_stream",
  STREAM_END = "stream_end",
}

export type EventData = {
  event: EventDataTypes;
  message_num: number;
  history: History;
};
