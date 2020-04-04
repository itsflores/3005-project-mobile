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