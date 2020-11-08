import EventResponse from './EventResponse';
import Generic from './Generic';
import Params from './Params';

export default interface ApiResponse extends EventResponse {
  body?: Generic;
  params?: Params;
  request?: { method: string; url: string };
}
