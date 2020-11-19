import Data from './Data';

export default interface Event {
  data?: Data;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  resultOnly?: boolean;
  serviceKey?: string;
}
