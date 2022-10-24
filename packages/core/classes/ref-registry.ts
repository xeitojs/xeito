import { RefID } from "../types/ref-id";

export class RefRegistry {

  /**
   * Map with all the registered refs
   */
  private static readonly refMap: Map<RefID, HTMLElement | any> = new Map();

  /**
   * Register a ref in the registry
   * @param {RefID} refId 
   * @param {HTMLElement | any} ref 
   */
  public static registerRef(refId: RefID, ref: HTMLElement | any): void {
    if (!this.refMap.has(refId)) {
      this.refMap.set(refId, ref);
    } else {
      throw new Error(`Ref ${refId} already registered`);
    }
  }

  /**
   * Returns a ref from the registry
   * @param {RefID} refId 
   * @returns {HTMLElement | null}
   */
  public static getRef<T=unknown>(refId: RefID): T | null | HTMLElement {
    const ref = this.refMap.get(refId);
    if (ref) {
      return ref;
    } else {
      return null;
    }
  }

  /**
   * Removes a ref from the registry
   * @param {RefID} refId 
   */
  public static removeRef(refId: RefID): void {
    this.refMap.delete(refId);
  }
  

}
