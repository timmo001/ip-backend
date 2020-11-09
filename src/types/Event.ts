import Data from './Data';

export default interface Event {
  data?: Data;
  id?: string;
  service: string;
  serviceKey?: string;
}
