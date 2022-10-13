import { ContainerID } from './../types/container-id';
import { ServiceID } from '../types/service-id';
import { Registry } from '../classes/registry';

export function Inject(containerId?: ContainerID) {
  
  return function(target: any, key: string) {
    const serviceId: ServiceID = Reflect.getMetadata("design:type", target, key);

    Object.defineProperty(target, key, {
      get: () => {
        let serviceInstance;
        // If no containerId is passed, use the global container
        if (!containerId) {
          // Get the instance from the global container
          serviceInstance = Registry.globalContainer.getService(serviceId);
        } else {
          // Get the instance from the container
          serviceInstance = Registry.getContainer(containerId).getService(serviceId);
        }
        return serviceInstance;
      }
    });
  }

}
