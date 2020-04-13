import * as SQLite from 'expo-sqlite';
import { Database } from 'expo-sqlite';
import * as D from './SQL/ddl.sql';
import * as Q from './SQL/queries.sql';
import {  } from './SQL/triggers.sql';
import initialBooks from './data/starterData';

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
    transaction.executeSql(Q.clearGenres, [], (_, { rows }) => {})
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
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(query, [], (_, { rows }) => {
        resolve(rows);
      });
    }, (err) => console.log(err))
  });
}

export const populateBooks = () => {
  
}