// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import counterSlice from './counter';


// use redux-toolkit's configureStore to do combineReducers(redux) and createStore(redux)
const store = configureStore({
  // mutiple useSlice
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
  // single useSlice
  // reducer: counterSlice.reducer,
});


export default store;
