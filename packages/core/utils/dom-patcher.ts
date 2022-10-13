import {
  init,
  classModule, 
  propsModule, 
  styleModule, 
  attributesModule, 
  eventListenersModule,
  datasetModule
} from 'snabbdom';

export const domPatcher = init([
  classModule,
  propsModule,
  styleModule,
  datasetModule,
  attributesModule,
  eventListenersModule
])
