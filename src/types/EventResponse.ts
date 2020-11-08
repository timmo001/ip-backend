import Event from './Event';

export default interface EventResponse extends Event {
  completed?: string;
  resultOnly?: boolean;
  started?: string;
  status?: string;
  updated?: string;
}
