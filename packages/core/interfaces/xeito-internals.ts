
export interface XeitoInternals {
  selector?: string;
  actions?: any[];
  pipes?: any[];
  imports?: any[];
  services?: any[];
  shadow?: boolean;
  DOMRoot?: Element | HTMLElement | Node | null;
  styles?: any;
  template?: Element | HTMLElement | Node | null;
  global?: Record<string, any>;
}
