import Action from './Action';
import Condition from './Condition';

export default interface Service {
  key: string;
  name: string;
  description?: string;
  conditions: Condition[];
  actions: Action[];
}
