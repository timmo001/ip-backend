import Event from "./Event";

export default interface EventResponse extends Event {
  completed?: string;
  errorCode?: number;
  message?: string;
  started?: string;
  status?: string;
  updated?: string;
}
