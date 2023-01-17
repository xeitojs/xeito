
// Export the Xeito Router plugin
export { XeitoRouterPlugin } from './classes/xeito-router-plugin';

// Export the Xeito Router Components
export { RouterSlot } from './components/router-slot';
export { RouterLink } from './components/router-link';

// Export the Xeito Router Interfaces
export type { RouteParams } from './interfaces/route-params';
export type { Route } from './interfaces/route';
export type { RouterGuard } from './interfaces/router-guard';
export type { RouterOptions } from './interfaces/router-options';
export type { XeitoRouter } from './interfaces/xeito-router';

// Re-exports from the History package
export type { Update, Listener, Location } from 'history';
