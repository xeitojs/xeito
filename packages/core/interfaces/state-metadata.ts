/**
 * State metadata
 * Optional configuration for the @State decorator passed as an object
 */
export interface StateMetadata {
  prop?: boolean; // If true, the state will also listen to changes in the corresponding html attribute\

  /**
   * Transform function
   * Allows to transform the value of the state before returning it
   * e.g:
   * @State({transform: (value) => value + 1}) count: number = 0; // The value of count will be increased by 1 when accessed
   * @State({transform: (value) => value?.toUpperCase()}) name: string = 'John'; // The value of name will be uppercased when accessed
   * 
   * WARNING: The transform function does not work with stores, try using a DerivedStore instead
   */
  transform?: (value: any) => any;
}
