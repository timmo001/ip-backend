import Generic from "./Generic";
import GenericObject from "./GenericObject";

export default interface Data {
  body?: Generic;
  endpoint?: string;
  environment?: string;
  headers?: GenericObject;
  id?: string;
  method?: string;
  parameters?: GenericObject;
  url?: string;
  version?: string;
}
