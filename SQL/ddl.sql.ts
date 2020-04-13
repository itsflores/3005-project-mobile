export const createRoles = `
  create table roles(
    role_ID text primary key,
    role_name text
  );`

export const createUsers=`
  create table users(
    user_ID text primary key,
    role_ID text,
    username text,
    password text,
    card_number int,
    year int,
    month int,
    address text,
    phone_number text,
    foreign key (role_ID) references roles(role_ID)
  );`

export const createOrders=`
  create table orders(
    tracking_num text primary key,
    user_ID text,
    price text,
    year int,
    day int,
    month int,
    foreign key (user_ID) references users(user_ID)
  );`

export const createPub=`
  create table publisher(
    publisher_ID text primary key,
    name text,
    bank_number int,
    address text,
    phone_num text
  );`

export const createBook=`
  create table book(
    book_ID text primary key,
    publisher_ID text,
    stock int,
    title text,
    isbn text,
    page_count int,
    published_year int,
    thumbnail_url text,
    price text,
    publisher_fee int,
    foreign key (publisher_ID) references publisher(publisher_ID)
  );`

export const createAuthor=`
  create table author(
    book_ID text,
    name text,
    primary key (book_ID, name),
    foreign key (book_ID) references book(book_ID)
  );`

export const createCategory=`
  create table category(
    book_ID text,
    category_name text,
    primary key (book_ID, category_name),
    foreign key (book_ID) references book(book_ID)
  );`

export const createItem=`
  create table item(
    item_ID text primary key,
    order_ID text,
    book_ID text,
    quantity int,
    foreign key (order_ID) references orders(tracking_num),
    foreign key (book_ID) references book(book_ID)
  );
`;
