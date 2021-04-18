import { CombinedState, combineReducers } from "redux";
import { UpdateAppPageAction } from "./actions";
import { Page } from "../Types";

const initialAppPage = Page.Welcome;

export const appPageReducer = (
  state: Page = initialAppPage,
  action: UpdateAppPageAction
) => {
  switch (action.type) {
    case "updateAppPage":
      return action.appPage;
    default:
      return state;
  }
};

const reducers = combineReducers({
  appPage: appPageReducer,
});

export const rootReducer = (
  state: CombinedState<{ appPage: Page }> | undefined,
  action: UpdateAppPageAction
) => {
  return reducers(state, action);
};

export type RootState = ReturnType<typeof reducers>;
