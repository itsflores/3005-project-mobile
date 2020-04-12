export class User {
  userId: string = null;
  roleId: string = null;
  username: string = null;
  password: string = null;
  cardNumber: number = null;
  year: number = null;
  month: number = null;
  address: string = null;
  phoneNumber: string = null;
  
  constructor(
    userId: string,
    roleId: string,
    username: string,
    password: string,
    cardNumber: number,
    year: number,
    month: number,
    address: string,
    phoneNumber: string
    ) {
    this.userId = userId;
    this.roleId = roleId;
    this.username = username;
    this.password = password;
    this.cardNumber = cardNumber;
    this.year = year;
    this.month = month;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}
