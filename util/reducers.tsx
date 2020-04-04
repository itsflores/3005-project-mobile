import { combineReducers } from 'redux';
import books from '../data/starterData';

const INITIAL_STATE = {
  books: books,
  bookList: books.sort((a: any, b: any) => parseInt(b.publishedYear) - parseInt(a.publishedYear)),
  order: [],
  userStatus: true,
  currUser: {
    admin: true
  }
};

const sampleReducer = (state = INITIAL_STATE, action) => {
  const prevState = state;
  const { order, bookList } = state;
  const newOrder = order;
  const newBookList = bookList;

  switch (action.type) {
    case 'ADD_BOOK':
      // const prevState = state;
      // const { order } = state;
      // newOrder = order;
      newOrder.push(action.payload);

      return { ...prevState, order: newOrder };
    case 'REMOVE_BOOK':
      // let newOrder = order;
      newOrder.splice(action.payload, 1);

      return { ...prevState, order: newOrder };
    case 'ADD_BOOK_STORE':
      newBookList.push(action.payload);
      newBookList.sort((a: any, b: any) => parseInt(b.publishedYear) - parseInt(a.publishedYear))

      return { ...prevState, bookList: newBookList, order: [] }
    default:
      return state
  }
};

export default combineReducers({
  bookAppStore: sampleReducer,
});