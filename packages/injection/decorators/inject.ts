import { Registry } from "../classes/registry";

export function Inject(serviceName?: string) {

  return function _InjectDecorator(target: any, propertyKey: string) {
      
    Object.defineProperty(target, propertyKey, {
      get() {
        return Registry.getService(serviceName ?? propertyKey);
      },
      set(value: any) {
        console.warn(`Cannot set value of ${serviceName} service`);
      }
    });

  }

}
