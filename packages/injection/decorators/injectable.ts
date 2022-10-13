import { Container } from './../classes/container';
import { ContainerID } from './../types/container-id';
import { Registry } from '../classes/registry';

export function Injectable(containerId?: ContainerID) {
  
  return function(target: any): void {
    const instance = new target();

    // If no containerId is passed, use the global container
    if (!containerId) {
      // Register the instance in the global container
      Registry.globalContainer.registerService(target, instance);
    } else {
      // Check if container exists
      if (Registry.containerExists(containerId)) {
        // If exists, get the container and register the service
        Registry.getContainer(containerId).registerService(target, instance);
      } else {
        // If not, create the container and register the service
        const container = new Container(containerId);
        Registry.registerContainer(container);
        container.registerService(target, instance);
      }
    }
  }

}
