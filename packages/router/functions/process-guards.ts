import { XeitoRouter } from '../classes/xeito-router';
import { Route } from '../interfaces/route';
import { RouterGuard } from '../interfaces/router-guard';

export async function processGuards(Route: Route, currentPath?: string): Promise<boolean> {

  return new Promise((resolve) => {
    	
    let shouldContinue: boolean = true;
    let redirectRoute: string | null = null;
    
    // If the route has guards, process them
    if (Route.guards) {
      Route.guards.forEach(async (guard: RouterGuard) => {
        
        // Check if the guard return a promise
        if (guard instanceof Promise) {

          const guardResult: boolean | string = await guard;

          if (typeof guardResult === 'string') {
            redirectRoute = guardResult;
          } else {
            shouldContinue = guardResult;
          }
        }
      
        // Check if the guard returns a string
        if (typeof guard === 'string') redirectRoute = guard;
      
        // Check if the guard returns a boolean
        if (typeof guard === 'boolean') shouldContinue = guard;
        
      });
    }
  
    // If there is a redirect route, redirect to it
    if (redirectRoute) {
      let redirectPath = redirectRoute;
      if (currentPath) redirectPath = currentPath + redirectPath;
      XeitoRouter.replace(redirectPath);
      resolve(false);
    };
  
    // Return if the route should continue
    resolve(shouldContinue);

  });
  
}
