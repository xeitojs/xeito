
export interface ComponentMetadata {
  selector: string;   // The selector of the component (e.g. 'app-root')
  styles?: string[];  // The styles of the component (e.g. ['button { background-color: red; }'])
  shadow?: boolean;   // If the component should use shadow dom
  imports?: any[];    // Other components that should be imported to be used in the template (e.g. [CounterComponent])
  actions?: any[];    // Actions that should be imported to be used in the template (e.g. [TextColorAction])
  pipes?: any[];      // Pipes that should be imported to be used in the template (e.g. [UpperCasePipe])
}
