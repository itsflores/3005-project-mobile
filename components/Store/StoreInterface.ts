export interface StoreState {
	bookList: any,
	order: bookUnit [],
	search: null | string,
	showNewBook: boolean,
	newBook: newBook,
	searchList: any
}

export interface StoreProps {
	bookAppStore: any,
	addBookToOrder: Function,
	removeBookFromOrder: Function,
	addBookToStore: Function,
	removeBookFromStore: Function,
}

export interface newBook {
	thumbnail_url: string | null,
	title: string | null,
	authors: string | null,
	published_year: string | null,
	categories: string | null, 
	isbn: string | null,
	price: string | null,
	page_count: string | null,
	stock: string | null,
	publisher_fee: string | null,
	publisher_ID: string | null,
}

export interface bookUnit {
	book: any,
	quantity: number
}