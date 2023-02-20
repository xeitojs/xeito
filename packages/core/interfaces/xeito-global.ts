import { XeitoComponent } from "../classes/xeito-component";

export interface XeitoGlobal {

  properties: Record<string, any>;
  components: Array<typeof XeitoComponent>;
  pipes: any[];
  actions: any[];

}
