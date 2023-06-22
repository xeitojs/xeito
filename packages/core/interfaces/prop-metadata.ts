import { StateMetadata } from "./state-metadata";

export interface PropMetadata extends StateMetadata {
  prop?: true; // This is the only difference between PropMetadata and StateMetadata, prop is always true
}
