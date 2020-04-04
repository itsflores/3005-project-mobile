import { combineReducers } from 'redux';

const INITIAL_STATE = {
  orders: [],
  bookList: [],
  currUser: null,
  userAdmin: true,
};

const sampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  bookAppStore: sampleReducer,
});