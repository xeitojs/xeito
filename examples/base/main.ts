import { Xeito } from '../../packages/core';
import { AppComponent } from './app/app-component';

// Create a new app instance
Xeito.appShell.setRootComponent(AppComponent)

// Mount the app to the DOM
Xeito.appShell.bootstrap('#app');