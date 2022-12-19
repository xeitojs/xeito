
export class Registry {

  /**
   * Map with all the registered services
   * @type {Map<string, any>}
   */
  private static readonly serviceMap: Map<string, any> = new Map();

  /**
   * Register a service instance in the registry
   * @param name name of the service
   * @param service service instance
   */
  public static registerService(name: string, service: any): void {
    if (this.serviceMap.has(name)) {
      console.warn(`Service ${name} already exists, overwriting`);
    }
    this.serviceMap.set(name, service);
  }

  /**
   * Get a service instance from the registry
   * @param name name of the service
   * @returns service instance
   * @throws {Error} if the service is not found
   */
  public static getService(name: string): any {
    if (!this.serviceMap.has(name)) {
      throw new Error(`Service ${name} not found. Did you forget to register it?`);
    }
    return this.serviceMap.get(name);
  }

  /**
   * Checks if a service exists in the registry
   * @param name name of the service
   * @returns true if the service exists, false otherwise
   */
  public static serviceExists(name: string): boolean {
    return this.serviceMap.has(name);
  }

}