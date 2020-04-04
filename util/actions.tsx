export const addBookToOrder = newBook => ({
    type: 'ADD_BOOK',
    payload: newBook,
});

export const removeBookFromOrder = targetBook => ({
  type: 'REMOVE_BOOK',
  payload: targetBook,
});

export const addBookToStore = newBook => ({
  type: 'ADD_BOOK_STORE',
  payload: newBook,
});

export const removeBookFromStore = targetBook => ({
  type: 'REMOVE_BOOK_STORE',
  payload: targetBook,
});

export const increaseBookORder = targetBook => ({
  type: 'INCREASE_BOOK',
  payload: targetBook,
});