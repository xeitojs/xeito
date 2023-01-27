import { XeitoComponent } from "../classes/xeito-component";
import { XeitoGlobalConfig } from "./xeito-global-config";

export interface XeitoGlobal {

  properties: Record<string, any>;
  components: Array<typeof XeitoComponent>;
  pipes: any[];
  actions: any[];
  styleSheets: CSSStyleSheet[];
  config: XeitoGlobalConfig;

}
