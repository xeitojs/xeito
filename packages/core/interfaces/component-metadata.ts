
export interface ComponentMetadata {
  selector: string;                // The selector of the component (e.g. 'app-root')
  shadow?: boolean;                // If the component should use shadow dom
  shadowMode?: 'open' | 'closed';  // The shadow dom mode
  imports?: any[];                 // Other components that should be imported to be used in the template (e.g. [CounterComponent])
  actions?: any[];                 // Actions that should be imported to be used in the template (e.g. [TextColorAction])
  pipes?: any[];                   // Pipes that should be imported to be used in the template (e.g. [UpperCasePipe])
  services?: any[];                // Services that should be imported to be used in the template (e.g. [UserService]) Only to prevent minifiers from removing them
}
