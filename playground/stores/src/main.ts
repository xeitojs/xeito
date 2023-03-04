import { AppComponent } from './app.component';
import './style.css'
import { Xeito } from '../../../packages/core';

const app = new Xeito(AppComponent);
app.bootstrap('#app');