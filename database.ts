import * as SQLite from 'expo-sqlite';
import { Database } from 'expo-sqlite';
import * as D from './SQL/ddl.sql';
import * as Q from './SQL/queries.sql';
import {  } from './SQL/triggers.sql';
import initialBooks from './data/starterData';
import books from './data/starterData';

let db: Database = null;

export const initializeDb = () => {
  db = SQLite.openDatabase('lookinnabook.db', '1.0', 'LookinnaBook Database', 20000, () => {
    console.log('database created!');
  });
}

export const clearDb = () => {
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearItem, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearBook, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearPub, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearOrder, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  

  db.transaction((transaction) => {
    transaction.executeSql(Q.clearUser, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  

  db.transaction((transaction) => {
    transaction.executeSql(Q.clearRoles, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  
 db.transaction((transaction) => {
    transaction.executeSql(Q.clearAuthors, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  
 db.transaction((transaction) => {
    transaction.executeSql(Q.clearCategories, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
}

export const createDb = () => {

  db.transaction((transaction) => {
    transaction.executeSql(D.createRoles, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(D.createUsers, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(D.createOrders, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })  
  db.transaction((transaction) => {
    transaction.executeSql(D.createPub, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })

  db.transaction((transaction) => {
    transaction.executeSql(D.createBook, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  }) 
  db.transaction((transaction) => {
    transaction.executeSql(D.createItem, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })  
  db.transaction((transaction) => {
    transaction.executeSql(D.createAuthor, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  }) 
  db.transaction((transaction) => {
    transaction.executeSql(D.createCategory, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with creating ${err}`)
  }) 

}
export const populateDb = () => {

  db.transaction((transaction) => {
    transaction.executeSql(`
      ${Q.populateRoles}
      `, [], (_, { rows }) => {})
    transaction.executeSql(Q.populateUsers, [], (_, { rows }) => {})
  }, (err) => {
    console.log(`Error with populating users or roles ${err}`)
  })

  db.transaction((transaction) => {
    transaction.executeSql(Q.populatePubs, [], (_, { rows }) => {})

    transaction.executeSql(Q.bookAmount, [], (_, { rows }) => {console.log(rows)})

    transaction.executeSql(`select * from publisher`, [], (_, { rows }) => {
      console.log(`users:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with popuating publishers ${err}`)
  })  
}

export const obtainFullDb = () => {
  return 'something';
}

export const runQuery = (query: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(query, [], (_, { rows }) => {
        resolve(rows);
      });
    }, (err) => reject(err));
  });
}

export const populateBooks = () => {
  books.forEach((book) => {
    runQuery(`
      insert into book (
        book_ID, publisher_ID, stock, title, isbn, page_count, published_year, thumbnail_url, price, publisher_fee
      )
      values (
        '${book.book_ID}', '${book.publisher_ID}', ${book.stock}, '${book.title}', '${book.isbn}', ${book.page_count}, ${book.published_year}, '${book.thumbnail_url}', '${book.price}', ${book.publisher_fee}
      );
    `);

    book.authors.forEach((author) => {
      runQuery(`
        insert into author (
          book_ID, name
        )
        values (
          '${book.book_ID}', '${author}'
        )
      `)
    });

    book.categories.forEach((category) => {
      runQuery(`
        insert into category (
          book_ID, category_name
        )
        values(
          '${book.book_ID}', '${category}'
        )
      `)
    });

  })
}