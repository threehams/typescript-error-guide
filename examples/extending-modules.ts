import { Action, createStore, Dispatch } from "redux";

// go over all this "declare" stuff
// show how you can extend interfaces in modules
declare module "redux" {
  type ThunkAction<TState, TAction> = (
    dispatch: Dispatch,
    getState: () => TState
  ) => TAction;
  type AnyThunk = ThunkAction<any, any>;

  export interface Dispatch<
    A extends Action = AnyAction,
    T extends ThunkAction<any, A> = AnyThunk,
    TState = any
  > {
    <T extends A>(action: T): (dispatch: Dispatch, getState: () => TState) => T;
  }
}
