import Data from "./Data";

export default interface Event {
  id?: string;
  service: string;
  data?: Data;
}
