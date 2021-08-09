import Action from "./Action";
import GenericObject from "./GenericObject";

export default interface Service {
  id: string;
  name: string;
  description?: string;
  config?: GenericObject;
  actions: Action[];
}
