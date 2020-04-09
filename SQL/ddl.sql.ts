export const ddl = `
  create table roles(
    role_ID varchar(8),
    role_name varchar(20),
    primary key (role_ID)
  );

  create table users(
    user_ID varchar(8),
    role_ID varchar(8),
    username varchar(20),
    password varchar(20),
    card_number int,
    year int,
    month int,
    address varchar(30),
    phone_number varchar(10),
    primary key (user_ID),
    foreign key (role_ID) references roles(role_ID)
  );

  create table orders(
    tracking_num varchar(8),
    user_ID varchar(8),
    price decimal(10, 2),
    year int,
    day int,
    month int,
    primary key (tracking_num),
    foreign key (user_ID) references users(user_ID)
  );

  create table publisher(
    publisher_ID varchar(8),
    name varchar (20),
    bank_number int,
    address varchar (30),
    phone_num varchar(10),
    sale int,
    primary key (publisher_ID)
  );

  create table book(
    book_ID varchar(8),
    publisher_ID varchar(8),
    stock int,
    title varchar(20),
    isbn varchar(17),
    page_count int,
    published_year int,
    thumbnail_url varchar(800),
    authors varchar(100),
    price decimal(10,2),
    category varchar(100),
    genre varchar(20),
    primary key (book_ID),
    foreign key (publisher_ID) references publisher(publisher_ID)
  );

  create table item(
    item_ID varchar(8),
    order_ID varchar(8),
    book_ID varchar(8),
    primary key (item_ID),
    foreign key (order_ID) references orders(tracking_num),
    foreign key (book_ID) references book(book_ID)
  );
`;
