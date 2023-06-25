
export interface XeitoInternals {
  selector?: string;
  actions?: any[];
  pipes?: any[];
  imports?: any[];
  services?: any[];
  DOMRoot?: Element | HTMLElement | Node | String | null;
  template?: Element | HTMLElement | Node | string | null;
  global?: Record<string, any>;
}
