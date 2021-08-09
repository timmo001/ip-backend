import Data from "./Data";
import EventResponse from "./EventResponse";
import Generic from "./Generic";

export default interface ApiResponse extends EventResponse {
  response: Generic;
  request?: Data;
}
