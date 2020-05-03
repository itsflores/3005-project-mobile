export interface AccountProps {
  bookAppStore: any,
	logIn: Function,
  logOut: Function,
  updateUser: Function
}

export interface AccountState {
  showOrderHistory: boolean,
  showBilling: boolean,
  showTracking: boolean,
  showNewAdmin: boolean,
  showNewPublisher: boolean,
  showDeleteUser: boolean,
  showSales: boolean,
  inputUsername: null | string,
  inputPassword: null | string,
  inputPublisherId: null | string,
  inputPublisherName: null | string,
  inputPublisherAddress: null | string,
  inputPublisherBankNumber: null | string,
  inputPublisherPhone: null | string,
  newAdminSelection: null | string,
  updateExpiryMonth: null | string,
  updateExpiryYear: null | string,
  updateCardNumber: null | string,
  updateAddress: null | string,
  updatePhoneNumber: null | string
  deleteUserSelection: null | string,
  inputTrackOrder: null | string,
  orderStatus: null | string,
  totalSales: null | string
  categorySales: null | any,
  authorSales: null | any,
  publisherSales: null | any,
  totalPublisherFees: null | string,
  totalEarnings: null | string,
  totalRevenue: null | string,
  availableUsers: any [],
  orders: any [],
}