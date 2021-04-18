import { Page } from "../Types";

export interface UpdateAppPageAction {
  type: "updateAppPage";
  appPage: Page;
}

export const updateAppPage = (appPage: Page) => ({
  type: "updateAppPage",
  appPage,
});
