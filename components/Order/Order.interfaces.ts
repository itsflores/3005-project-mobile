export interface OrderProps {
  bookAppStore: any,
	removeBookFromOrder: Function,
  increaseBookOrder: Function, 
  decreaseBookOrder: Function,
  clearOrder: Function
}

export interface OrderState {
  totalPrice: number,
  totalBooksPrice: number,
  totalBooks: number
  totalTax: number,
  totalShipping: number,
  currOrder: [],
}