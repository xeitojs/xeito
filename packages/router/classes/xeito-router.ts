import { createHashHistory, History, Update, createBrowserHistory } from 'history';
import { Subject } from 'rxjs';

export class XeitoRouter {

  private static history: History;
  static activeUpdate: Update;
  static routeUpdate$: Subject<Update> = new Subject();

  static initializeHistory(strategy: string) {
    // Initialize the history instance based on the strategy
    if (strategy === 'hash') this.history = createHashHistory();
    else this.history = createBrowserHistory();

    // Notify the route update observable when the history changes
    // and store the active update
    this.history.listen((update: Update) => {
      this.routeUpdate$.next(update);
      this.activeUpdate = update;
    });
  }

  static getHistory(): History {
    return this.history;
  }

  static push(path: string, state?: any) {
    this.history.push(path, state);
  }
  
  static replace(path: string, state?: any) {
    this.history.replace(path, state);
  }

  static go(delta: number) {
    this.history.go(delta);
  }

  static back() {
    this.history.back();
  }

  static forward() {
    this.history.forward();
  }

  static createHref(path: string): string {
    return this.history?.createHref(path);
  }

}
