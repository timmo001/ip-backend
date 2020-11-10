import Data from './Data';

export default interface Event {
  data?: Data;
  id?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  resultOnly?: boolean;
  service: string;
  serviceKey?: string;
}
