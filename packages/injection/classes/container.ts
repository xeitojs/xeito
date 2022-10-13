import { ContainerID } from './../types/container-id';
import { ServiceID } from "../types/service-id";

export class Container {

  public readonly id!: ContainerID;

  /**
   * Map with all the registered services
   * @type {Map<ServiceID, any>}
   */
  private serviceMap: Map<ServiceID, any> = new Map();

  /**
   * Constructor
   * @param {ContainerId} containerId Name of the container
   */
  constructor(containerId: ContainerID) {
    this.id = containerId;
  }

  /**
   * Register a service in the container
   * @param {ServiceID} serviceId Id of the service
   * @param service {any} Service to register
   * @returns {Container} Returns the container for chaining
   */
  public registerService(serviceId: ServiceID, service: any): this {
    
    if (!this.serviceMap.has(serviceId)) {
      this.serviceMap.set(serviceId, service);
    }

    return this;
  }
  
  /**
   * Returns a service instance from the container
   * @param {ServiceID} serviceId id of the service
   * @returns {any} Returns the service
   */
  public getService<T=unknown>(serviceId: ServiceID): T {
    const instance = this.serviceMap.get(serviceId);
    if (instance) {
      return instance;
    } else {
      throw new Error(`Service not found in container ${this.id}`);
    }
  }

}
