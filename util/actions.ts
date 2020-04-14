export const addBookToOrder = newBook => ({
  type: 'ADD_BOOK',
  payload: newBook,
});

export const removeBookFromOrder = targetIndex => ({
  type: 'REMOVE_BOOK',
  payload: targetIndex,
});

export const addBookToStore = newBook => ({
  type: 'ADD_BOOK_STORE',
  payload: newBook,
});

export const removeBookFromStore = targetIndex => ({
  type: 'REMOVE_BOOK_STORE',
  payload: targetIndex,
});

export const increaseBookOrder = targetIndex => ({
  type: 'INCREASE_BOOK',
  payload: targetIndex,
});

export const decreaseBookOrder = targetIndex => ({
  type: 'DECREASE_BOOK',
  payload: targetIndex,
});

export const clearOrder = () => ({
  type: 'CLEAR_ORDER',
})

export const logIn = credentials => ({
  type: 'LOG_IN',
  payload: credentials
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const updateUser = (newInfo) => ({
  type: 'UPDATE_USER',
  payload: newInfo 
})
