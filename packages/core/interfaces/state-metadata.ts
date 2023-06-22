/**
 * State metadata
 * Optional configuration for the @State decorator passed as an object
 */
export interface StateMetadata {
  prop?: boolean; // If true, the state will also listen to changes in the corresponding html attribute
}
