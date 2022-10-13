import { ContainerID } from './../types/container-id';
import { Container } from './container';
export class Registry {

  /**
   *  Map with all the created custom containers
   * @type {Map<ContainerID, Container>}
   * */ 
  private static readonly containerMap: Map<ContainerID, Container> = new Map();

  /**
   * Default global container, not stored in the containerMap
   * @type {Container}	
   */
  public static readonly globalContainer: Container = new Container('default');

  /**
   * Get a container by its ID
   * @param {ContainerID} id
   * @returns {ContainerID} 
   * @throws {Error} If the container is not found
   */
  public static registerContainer(container: Container): ContainerID {
    
    // Check if the container passed is valid
    if (container instanceof Container === false) {
      throw new Error('Container must be an instance of Container');
    }

    // Check if the container is already registered
    if (this.containerMap.has(container.id)) {
      throw new Error(`Container ${container.id} already exists`);
    }

    // Check if the container is the global container
    if (container.id === this.globalContainer.id) {
      throw new Error(`Container ${container.id} is the global container`);
    }

    // Register the container
    this.containerMap.set(container.id, container);

    return container.id;
  }

  /**
   * Checks if a container exists by its ID
   * @param {ContainerID} id
   * @returns {boolean} 
   */
  public static containerExists(id: ContainerID): boolean {
    return this.containerMap.has(id);
  }

  /**
   * Returns the container for the given ID and throws an error if it doesn't exist
   * @param {ContainerID} id
   * @returns {Container} 
   */
  public static getContainer(id: ContainerID): Container {
    const existingContainer = this.containerMap.get(id);
    
    if (existingContainer === undefined) {
      throw new Error(`Container ${id} does not exist`);
    }

    return existingContainer;
  }

  /**
   * Removes a container from the registry and throws an error if it doesn't exist
   * @param {ContainerID} id
   * @returns {boolean}
   */
  public static removeContainer(id: ContainerID): boolean {
    
    if (this.containerExists(id) === false) {
      throw new Error(`Container ${id} does not exist`);
    }

    return this.containerMap.delete(id);
  }

}
