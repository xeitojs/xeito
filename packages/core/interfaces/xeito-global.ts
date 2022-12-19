import { XeitoComponent } from "../classes/xeito-component";

export interface XeitoGlobal {

  properties: Record<string, any>;
  components: XeitoComponent[];
  pipes: any[];
  actions: any[];

}
