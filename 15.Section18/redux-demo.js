const redux = require('redux');

// It's a programming concept , have nothing to do with useReducer
const counterReducer = (state = { counter: 0 }, action) => {
  return {
    counter: state.counter + 1,
  };
};

const store = redux.createStore(counterReducer);

// subscriber
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// store subscribe
store.subscribe(counterSubscriber);

// dispatch the counterReducer
store.dispatch({ type: 'increment' });
