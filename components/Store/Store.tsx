import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import * as imagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBookToOrder, removeBookFromOrder, addBookToStore, removeBookFromStore } from '../../util/actions';
import { generalStyles, colors } from '../../App.styles';
import { StoreState, StoreProps } from './Store.interfaces';
import StoreStyles from './Store.styles';
import BookStyles from '../BookCard/BookCard.styles';
import BookCard from '../../components/BookCard/BookCard';
import { Header } from '../../components/Shared/SharedComponents';
import newbook from '../../assets/img/newbook.png';
import emptyCover from '../../assets/img/emptyCover.png';
import { runQuery } from '../../database';

const newBookInit = {
	thumbnail_url: null,
	title: null,
	authors: null,
	published_year: null,
	categories: null, 
	isbn: null,
	price: null,
	page_count: null,
	stock: null,
	publisher_fee: null,
	publisher_ID: null
}

const bookInputInfo = {
	title: 'title',
	authors: 'authors',
	published_year: 'year published',
	categories: 'categories',
	page_count: 'number of pages',
	isbn: 'ISBN',
	price: 'price',
	stock: 'stock (> 20)',
	publisher_ID: 'publisher id',
	publisher_fee: 'publisher fee'
}

class Store extends React.Component<StoreProps, StoreState> {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.bookAppStore,
			searchList: [],
			search: null,
			showNewBook: false,
			newBook: newBookInit,
		}
	}

	addToCart = (newId) => {
		const { bookList } = this.props.bookAppStore;
		this.props.addBookToOrder({ book: bookList[bookList.findIndex((currBook) => currBook.book_ID === newId)], quantity: 1 });
	}

	removeFromCart = (target) => {
		const { order } = this.props.bookAppStore;
		this.props.removeBookFromOrder(order.findIndex((currItem) => currItem.book.book_ID === target), 1);
	}

	removeFromStore = async (targetId) => {
		const { bookList } = this.props.bookAppStore;

		const printBooks = async () => console.log(await runQuery(`select * from book;`)
			.then((results: any) => Promise.resolve(results._array)));

		runQuery(`
			update book
			set stock = 0
			where book_ID = '${targetId}';
		`).then(async (result: any) => {
			this.setState({ searchList: [], search: '' });
			this.props.removeBookFromStore(bookList.findIndex((item) => item.book_ID === targetId));
		})
	}
	
	generateSearchList = (input) => {
		const { bookList } = this.props.bookAppStore;

		if (input) {
			const searchResults = bookList.filter((book) => {
				return (book.title.toUpperCase().includes(input.toUpperCase()))
				|| (book.authors.join(' ').toUpperCase().includes(input.toUpperCase()))
				|| (book.categories.join(' ').toUpperCase().includes(input.toUpperCase()))
				|| (book.published_year.toString().includes(input.toUpperCase()))
				|| (book.page_count.toString().includes(input.toUpperCase()))
				|| (book.price.toString().includes(input.toUpperCase()))
				|| (book.isbn.includes(input.toUpperCase()))
			});
		
			if (searchResults.length > 0) {
				return searchResults;
			} else {
				return null;
			}
		} else {
			return [];
		}
	}

	uploadImage = () => {
		imagePicker.launchImageLibraryAsync({
			allowsEditing: false,
			quality: 0.2,
		}).then((upload: any) => {
			if (upload.cancelled) {
				Alert.alert(
					'LookinnaBook',
					`That image didn't work, please try again!`,
					[{
						text: 'Done',
						style: 'default'
					}], {
						cancelable: true
					}
				);
			} else {
				this.setState((prevState) => ({
					newBook: {
						...prevState.newBook,
						thumbnail_url: upload.uri
					}
				}));
			}
		})
	}

	updateNewBook = (input, type) => {
		this.setState((prevState) => ({
			newBook: {
				...prevState.newBook,
				[type]: input
			}
		}))
	}

	verifyPublisher = async (targetID) => {
		return await runQuery(`
			select publisher_ID
			from publisher 
			where publisher_ID = '${targetID}';
		`).then(async (result: any) => {
			console.log(result);

			if (result._array.length === 1) {
				return await Promise.resolve(true);
			} else if (result._array.length === 0) {
				return await Promise.resolve(false);
			}
		})
	}

	saveNewBook = async () => {
		const { bookList } = this.props.bookAppStore;
		const { newBook } = this.state;
		let verified = true;

		const validPublisher = await this.verifyPublisher(newBook.publisher_ID)
		const isEmpty = !Object.values(newBook).some(bookEntry => (bookEntry === null));

		if (!isEmpty
			|| !validPublisher
			|| parseInt(newBook['price']) === NaN
			|| newBook['price'].length > 4
			|| parseInt(newBook['published_year']) === NaN
			|| parseInt(newBook['published_year']) > new Date().getFullYear()
			|| parseInt(newBook['page_count']) === NaN
			|| parseInt(newBook['stock']) === NaN
			|| parseInt(newBook['stock']) < 20
			|| parseInt(newBook['publisher_fee']) === NaN
		) {
			verified = false;
		}

		if (verified) {
			const newId = `b-${bookList.length + 1}`
			const newAuthors = [...newBook.authors.split(',')];
			const newCategories = [...newBook.categories.split(',')]

			this.props.addBookToStore({
				...newBook,
				book_ID: newId,
				published_year: parseInt(newBook.published_year),
				authors: newAuthors,
				categories: newCategories,
				page_count: parseInt(newBook.page_count),
				price: parseInt(newBook.price),
				publisher_fee: parseInt(newBook.publisher_fee)
			})
			
			newAuthors.forEach((author) => {
				runQuery(`
					insert into author (
						book_ID, name
					)
					values (
						'${newId}', '${author}'
					)
				`)
			});

			newCategories.forEach((category) => {
				runQuery(`
					insert into category (
						book_ID, category_name
					)
					values(
						'${newId}', '${category}'
					)
				`)
			});

			runQuery(`
				insert into book (
					book_ID, publisher_ID, stock, title, isbn, page_count, published_year, thumbnail_url, price, publisher_fee
				)
				values (
					'${newId}', '${newBook.publisher_ID}', ${newBook.stock}, '${newBook.title}', '${newBook.isbn}', ${newBook.page_count}, ${newBook.published_year}, '${newBook.thumbnail_url}', '${newBook.price}', ${newBook.publisher_fee}
				);
			`).then((result: any) => {
				Alert.alert(
					'LookinnaBook',
					`Your book has been added to the store!`,
					[{
						text: 'Done',
						style: 'default'
					}], {
						cancelable: true
					}
				);
			})

			this.setState({
				showNewBook: false, 
				newBook: newBookInit, 
			});
		} else {
			Alert.alert(
				'LookinnaBook',
				`Please verify your information and try again!`,
				[{
					text: 'Done',
					style: 'default'
				}], {
					cancelable: true
				}
			);
		}
	}

	render() {
		const { searchList, search, showNewBook, newBook } = this.state;
		const { bookList, order, currUser } = this.props.bookAppStore;

		// console.log(order);

		return (
			<View style={StoreStyles.storeContainer}>
				<Modal 
					animationType='fade'
					transparent={true}
					visible={showNewBook}
				>
					<View style={generalStyles.overlayContainer}>
						<View style={generalStyles.contentOverlayContainer}>
							<ScrollView style={{ width: '100%', marginBottom: 20 }}>
								<TouchableOpacity onPress={() => this.uploadImage()} style={{ alignSelf: 'center' }}>
									<Image source={newBook.thumbnail_url ? {uri: newBook.thumbnail_url} : emptyCover} style={BookStyles.bookOverlayImage}/>
								</TouchableOpacity>
								<View>
									{Object.keys(bookInputInfo).map((key, index) => (
										<TextInput 
											key={index}
											value={newBook[key]}
											onChangeText={(input) => this.updateNewBook(input, key)}
											style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
											placeholder={bookInputInfo[key]}
											keyboardType={['price', 'stock', 'publisher_fee', 'published_year', 'page_count'].includes(key)  ? 'number-pad' : 'default'}
										/>
									))}
								</View>
							</ScrollView>
							<TouchableOpacity 
								style={generalStyles.closeOverlayButton} 
								onPress={() => this.saveNewBook()}
							>
								<Text style={[generalStyles.actionExit, { color: colors.blue }]}>
									add book 
								</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								style={generalStyles.exitOverlayButton} 
								onPress={() => this.setState({ showNewBook: false, newBook: newBookInit })}
							>
								<Text style={[generalStyles.actionExit, { color: colors.blue }]}>
									close
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<View style={StoreStyles.headerContainer}>
					<Header title="Store" />
					{currUser !== null && currUser.admin && (
						<TouchableOpacity onPress={() => this.setState({ showNewBook: true })} style={StoreStyles.newBookButton}>
							<Text style={[generalStyles.header1, { marginRight: 10 }]}>
								new
								{'\n'}
								book
							</Text>
							<Image source={newbook} style={StoreStyles.newBookImage} />
						</TouchableOpacity>
					)}
				</View>
				<TextInput
					onChangeText={(e) => this.setState({ search: e, searchList: this.generateSearchList(e) })}
					style={[generalStyles.header1, StoreStyles.searchBox]}
					placeholder="search"
					value={search}
				/>
				<ScrollView showsVerticalScrollIndicator={false} style={StoreStyles.bookListConainer}>
					{searchList && (searchList.length > 0 ? searchList : bookList).map((book, index) => (
						book.stock > 0 && (
							<View key={index}>
								<BookCard
									key={index}
									author={book.authors}
									title={book.title}
									cover={book.thumbnail_url}
									price={book.price}
									release={book.published_year}
									id={book.book_ID}
									isbn={book.isbn}
									genres={book.categories}
									addBook={this.addToCart}
									removeBook={this.removeFromCart}
									type="store"
									numPages={book.page_count}
									publisher={book.publisher_ID}
								/>
								{currUser !== null && currUser.admin && (
									<TouchableOpacity onPress={() => this.removeFromStore(book.book_ID)}>
										<Text style={[generalStyles.actionExit, { color: colors.blue, marginBottom: 20, textAlign: 'center' }]}>
											remove
										</Text>
									</TouchableOpacity>
								)}
							</View>
						)
					))}
				</ScrollView>
			</View>
		)
	}
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
		addBookToOrder,
		removeBookFromOrder,
		addBookToStore,
		removeBookFromStore
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { bookAppStore } = state
  return { bookAppStore }
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);