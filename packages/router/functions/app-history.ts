import { History } from "history";

export let appHistory: History;

export const setAppHistory = (history: History) => {
  appHistory = history;
};