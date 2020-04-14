import { combineReducers } from 'redux';
import books from '../data/starterData';

interface INITIAL_STATE_INTERFACE {
  bookList: any [],
  order: any [],
  currUser: any
}

interface USER {
  userId: string,
  admin: boolean,
  username: string,
  cardNumber: number,
  expiryYear: number,
  expiryMonth: number,
  address: string,
  phoneNumber: string
}

const INITIAL_STATE: INITIAL_STATE_INTERFACE = {
  bookList: books.sort((a: any, b: any) => parseInt(b.publishedYear) - parseInt(a.publishedYear)),
  order: [],
  currUser: null
};

const bookStoreReducer = (state = INITIAL_STATE, action) => {
  const { order, bookList, currUser } = state;
  const newOrder = order;
  const newBookList = bookList;

  switch (action.type) {
    case 'ADD_BOOK':
      newOrder.push(action.payload);

      return { ...state, order: newOrder };

    case 'REMOVE_BOOK':
      newOrder.splice(action.payload, 1);

      return { ...state, order: newOrder };

    case 'ADD_BOOK_STORE':
      newBookList.push(action.payload);
      newBookList.sort((a: any, b: any) => parseInt(b.publishedYear) - parseInt(a.publishedYear))

      return { ...state, bookList: newBookList, order: [] }

    case 'REMOVE_BOOK_STORE':
      newBookList.splice(action.payload, 1);

      return { ...state, bookList: newBookList, order: [] }

    case 'INCREASE_BOOK':
      newOrder[action.payload].quantity++;
      return { ...state, order: newOrder };

    case 'DECREASE_BOOK':
      newOrder[action.payload].quantity--;

      return { ...state, order: newOrder };

    case 'CLEAR_ORDER':

      return { ...state, order: [] };
    case 'LOG_IN': 
      const newInfo = action.payload;

      const newUser: USER = {
        userId: newInfo.user_ID,
        admin: (newInfo.role_ID === 'r-00' ? true : false),
        username: newInfo.username,
        cardNumber: newInfo.card_number,
        expiryYear: newInfo.year,
        expiryMonth: newInfo.month,
        address: newInfo.address, 
        phoneNumber: newInfo.phone_number
      }

      return { ...state, currUser: newUser };

    case 'LOG_OUT': 

      return { ...state, currUser: null };
      
    case 'UPDATE_USER':
      const newUserInfo = action.payload;

      const updatedUser: USER = {
        ...currUser,
        cardNumber: newUserInfo.updateCardNumber,
        expiryMonth: newUserInfo.updateExpiryMonth,
        expiryYear: newUserInfo.updateExpiryYear,
        address: newUserInfo.updateAddress,
        phoneNumber: newUserInfo.updatePhoneNumber
      }
      
      return { ...state, currUser: updatedUser }

    default:
      return state
  }
};

export default combineReducers({
  bookAppStore: bookStoreReducer,
});