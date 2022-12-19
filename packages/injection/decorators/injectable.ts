import { Registry } from "../classes/registry"
import { InjectableMetadata } from "../interfaces/injectable-metadata";

export function Injectable(injectableMetadata: InjectableMetadata) {

  return function _InjectableDecorator(target: any) {
    Registry.registerService(injectableMetadata.selector, new target());
  }

}
