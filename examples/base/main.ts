import { Xeito } from '../../packages/core';
import { AppComponent } from './app/app-component';

const app = new Xeito(AppComponent);
app.bootstrap(document.getElementById('app'));