import EventResponse from './EventResponse';
import Generic from './Generic';
import Params from './Params';

export default interface ApiResponse extends EventResponse {
  response: Generic;
  request?: {
    body: Generic;
    method: string;
    params: Params;
    url: string;
  };
}
