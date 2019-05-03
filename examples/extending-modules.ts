import { Action, createStore, Dispatch } from "redux";

// go over all this "declare" stuff
// show how you can extend interfaces in modules
declare module "redux" {
  interface ThunkAction<TState, TAction = any> {
    <T extends TAction>(action: T): (
      dispatch: Dispatch,
      getState: () => TState
    ) => T;
  }
  type AnyThunk = ThunkAction<any>;
  export interface Dispatch<
    A extends Action = AnyAction,
    T extends ThunkAction<A> = AnyThunk,
    TState = any
  > {
    <T extends A>(action: T): (dispatch: Dispatch, getState: () => TState) => T;
  }

  type ThunkActionReturn<A> = A extends ThunkAction<infer T> ? T : A;
  export interface StoreCreator {
    <S, A extends any, Ext, StateExt>(
      reducer: Reducer<S, ThunkActionReturn<A>>,
      preloadedState?: DeepPartial<S>,
      enhancer?: StoreEnhancer<Ext>
    ): Store<S & StateExt, ThunkActionReturn<A>> & Ext;
  }
}

interface ThunkAction<TState, TAction = any> {
  <T extends TAction>(action: T): (
    dispatch: Dispatch,
    getState: () => TState
  ) => T;
}
interface Action1 {
  type: "PLAIN";
}
type Action2 = ThunkAction<{ type: "hi" }>;
const thunkAction: Action2 = (dispatch, getState) => ({
  type: "hi"
});

interface State {}
const { dispatch } = createStore<State, Action1 | Action2, {}, {}>(() => ({}));
dispatch({
  type: "PLAIN"
});
dispatch();
