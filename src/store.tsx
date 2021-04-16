import { AnyAction, CombinedState, combineReducers, createStore } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { reducer as helloReducer } from './components/inputPage/state/slice';
import { Dispatch } from 'react';

const reducerWithoutHydrate = combineReducers({
  hello: helloReducer,
});
export type RootState = ReturnType<typeof reducerWithoutHydrate>;

// Hydration with next-redux-wrapper
export const reducer = (state: RootState | undefined, action: AnyAction): RootState => {
  if (action.type == HYDRATE) {
    const clientState = state == null ? {} : state;
    const serverState = action.payload;
    return { ...clientState, ...serverState };
  }
  return reducerWithoutHydrate(state, action);
};

// https://github.com/kirill-konshin/next-redux-wrapper#usage
const makeStore = (context: Context) => configureStore({ reducer });
export const wrapper = createWrapper(makeStore, { debug: true });

// https://github.com/kirill-konshin/next-redux-wrapper/issues/207#issuecomment-719038396
// export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type AppDispatch = ThunkDispatch<RootState, null | undefined, AnyAction> &
  Dispatch<AnyAction>;

// https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f#ambient-module-%E5%AE%A3%E8%A8%80%E3%81%A7-overload-%E3%81%99%E3%82%8B
declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
