import { Route } from '../interfaces/route';
import { XeitoRouter } from '../interfaces/xeito-router';

export async function processGuards(route: Route, router: XeitoRouter): Promise<boolean> {

  return new Promise(async (resolve) => {
    	
    let shouldContinue: boolean = true;
    let redirectRoute: string | null = null;
    
    // If the route has guards, process them
    if (route.guards) {
      for await (const guard of route.guards) {
        const guardResult = guard(router.location().pathname);
    
        // Check if the guard return a promise
        if (guardResult instanceof Promise) {
    
          const promiseGuardResult: boolean | string = await guardResult;
    
          if (typeof promiseGuardResult === 'string') {
            redirectRoute = promiseGuardResult;
          } else {
            shouldContinue = promiseGuardResult;
          }
        }
      
        // Check if the guard returns a string
        if (typeof guardResult === 'string') redirectRoute = guardResult;
      
        // Check if the guard returns a boolean
        if (typeof guardResult === 'boolean') shouldContinue = guardResult;
      }
      
      // If the guard returns a string, redirect to that route
      if (redirectRoute) {
        router.replace(redirectRoute);
        resolve(false);
      }

      // Resolve the promise with the result of the guard
      resolve(shouldContinue);
    } else {
      resolve(true);
    }
  });
}

