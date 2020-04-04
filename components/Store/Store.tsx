import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import * as imagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBookToOrder, removeBookFromOrder, addBookToStore, removeBookFromStore } from '../../util/actions';
import { generalStyles, colors } from '../../App.styles';
import StoreStyles from './Store.styles';
import BookStyles from '../BookCard/BookCard.styles';
import BookCard from '../../components/BookCard/BookCard';
import { Header } from '../../components/Shared/SharedComponents';
import newbook from '../../assets/img/newbook.png';
import emptyCover from '../../assets/img/emptyCover.png';

interface StoreState {
	bookList: any,
	order: bookUnit [],
	search: null | string,
	showNewBook: boolean,
	newBook: newBook,
	searchList: any
}

interface StoreProps {
	bookAppStore: any,
	addBookToOrder: Function,
	removeBookFromOrder: Function,
	addBookToStore: Function,
	removeBookFromStore: Function,
}

interface newBook {
	thumbnailUrl: string | null,
	title: string | null,
	authors: string | null,
	publishedYear: string | null,
	categories: string | null, 
	isbn: string | null,
	price: string | null,
	pageCount: string | null,
	stock: string | null
}

interface bookUnit {
	book: any,
	quantity: number
}

const newBookInit = {
	thumbnailUrl: null,
	title: null,
	authors: null,
	publishedYear: null,
	categories: null, 
	isbn: null,
	price: null,
	pageCount: null,
	stock: null
}

const bookInputInfo = {
	title: 'title',
	authors: 'authors',
	publishedYear: 'year published',
	categories: 'categories',
	pageCount: 'number of pages',
	isbn: 'ISBN',
	price: 'price',
	stock: 'stock (> 20)'
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
		const { order, bookList } = this.props.bookAppStore;
		this.props.addBookToOrder({ book: bookList[bookList.findIndex((currBook) => currBook.id === newId)], quantity: 1 })
	}

	removeFromCart = (target) => {
		const { order } = this.props.bookAppStore;
		this.props.removeBookFromOrder(order.findIndex((currItem) => currItem.book.id === target), 1)
	}

	removeFromStore = (targetId) => {
		const { bookList } = this.state;
		const newList = bookList;
		newList.splice(newList.findIndex((item) => item.id === targetId), 1);

		this.setState({ bookList: newList })
	}
	
	generateSearchList = (input) => {
		const { bookList } = this.props.bookAppStore;

		if (input) {
			const searchResults = bookList.filter((book) => {
				return (book.title.toUpperCase().includes(input.toUpperCase()))
				|| (book.authors.join(' ').toUpperCase().includes(input.toUpperCase()))
				|| (book.categories.join(' ').toUpperCase().includes(input.toUpperCase()))
				|| (book.publishedYear.toString().includes(input.toUpperCase()))
				|| (book.pageCount.toString().includes(input.toUpperCase()))
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
		}).then((upload) => {
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
						thumbnailUrl: upload.uri
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

	saveNewBook = () => {
		const { bookList } = this.props.bookAppStore;
		const { newBook } = this.state;
		let verified = true;

		Object.keys(newBook).forEach((entry) => {
			try {
				if (newBook[entry] === null 
					|| parseInt(newBook['price']) === NaN
					|| newBook['price'].length > 4
					|| parseInt(newBook['publishedYear']) === NaN
					|| parseInt(newBook['publishedYear']) > new Date().getFullYear()
					|| parseInt(newBook['pageCount']) === NaN
					|| parseInt(newBook['stock']) === NaN
					|| parseInt(newBook['stock']) < 20) {
					verified = false;
				}
			} catch {
				
			}
		})

		// console.log(newBook);

		if (verified) {
			this.props.addBookToStore({
				...newBook,
				id: `b-${bookList.length + 1}`,
				publishedYear: parseInt(newBook.publishedYear),
				authors: [...newBook.authors.split(',')],
				categories: [...newBook.categories.split(', ')],
				pageCount: parseInt(newBook.pageCount),
				price: parseInt(newBook.price)
			})

			this.setState({
				showNewBook: false, 
				newBook: newBookInit, 
			})
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
		const { bookList, order, userStatus, currUser } = this.props.bookAppStore;

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
									<Image source={newBook.thumbnailUrl ? {uri: newBook.thumbnailUrl} : emptyCover} style={BookStyles.bookOverlayImage}/>
								</TouchableOpacity>
								<View>
									{Object.keys(bookInputInfo).map((key, index) => (
										<TextInput 
											key={index}
											value={newBook[key]}
											onChangeText={(input) => this.updateNewBook(input, key)}
											style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
											placeholder={bookInputInfo[key]}
											keyboardType={key === 'price' ? 'number-pad' : 'default'}
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
					{userStatus && currUser.admin && (
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
						<View key={index}>
							<BookCard
								key={index}
								author={book.authors}
								title={book.title}
								cover={book.thumbnailUrl}
								price={book.price}
								release={book.publishedYear}
								id={book.id}
								isbn={book.isbn}
								genres={book.categories}
								addBook={this.addToCart}
								removeBook={this.removeFromCart}
								type="store"
								numPages={book.pageCount}
							/>
							{userStatus && currUser.admin && (
								<TouchableOpacity onPress={() => this.removeFromStore(book.id)}>
									<Text style={[generalStyles.actionExit, { color: colors.blue, marginBottom: 20, textAlign: 'center' }]}>
										remove
									</Text>
								</TouchableOpacity>
							)}
						</View>
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