import { XeitoComponent } from "../classes/xeito-component";

export interface XeitoGlobal {

  properties: Record<string, any>;
  actions: Record<string, any>;
  components: XeitoComponent[];

}
