import { combineReducers } from 'redux';
import books from '../data/starterData';

const INITIAL_STATE = {
  books: books,
  bookList: books.sort((a: any, b: any) => parseInt(b.publishedYear) - parseInt(a.publishedYear)),
  order: [],
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