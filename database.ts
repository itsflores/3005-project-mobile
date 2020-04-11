import * as SQLite from 'expo-sqlite';
import { Database } from 'expo-sqlite';
import * as D from './SQL/ddl.sql';
import * as Q from './SQL/queries.sql';
import {  } from './SQL/triggers.sql';

let db: Database = null;

export const initializeDb = () => {
  db = SQLite.openDatabase('lookinnabook.db', '1.0', 'LookinnaBook Database', 20000, () => {
    console.log('database created!');
  });
}

export const clearDb = () => {
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearItem, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearBook, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearPub, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(Q.clearOrder, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  

  db.transaction((transaction) => {
    transaction.executeSql(Q.clearUser, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  

  db.transaction((transaction) => {
    transaction.executeSql(Q.clearRoles, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })  
}

export const createDb = () => {

  db.transaction((transaction) => {
    transaction.executeSql(D.createRoles, [], (_, { rows }) => {
      console.log(`created roles:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(D.createUsers, [], (_, { rows }) => {
      console.log(`created users:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })
  db.transaction((transaction) => {
    transaction.executeSql(D.createOrders, [], (_, { rows }) => {
      console.log(`created orders:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })  
  db.transaction((transaction) => {
    transaction.executeSql(D.createPub, [], (_, { rows }) => {
      console.log(`created Pub:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })

  db.transaction((transaction) => {
    transaction.executeSql(D.createBook, [], (_, { rows }) => {
      console.log(`created book:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with creating ${err}`)
  }) 
  db.transaction((transaction) => {
    transaction.executeSql(D.createItem, [], (_, { rows }) => {
      console.log(`created item:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with creating ${err}`)
  })  

}
export const populateDb = () => {

  db.transaction((transaction) => {
    transaction.executeSql(`
      ${Q.populateRoles}
      `, [], (_, { rows }) => {
        console.log(`populated:`)
        console.log(rows);
      })
    transaction.executeSql(Q.populateUsers, [], (_, { rows }) => {
      console.log(`users:`)
      console.log(rows);
    })


    transaction.executeSql(`select * from book`, [], (_, { rows }) => {
      console.log(`users:`)
      console.log(rows);
    })

    transaction.executeSql(`select * from roles`, [], (_, { rows }) => {
      console.log(`users:`)
      console.log(rows);
    })

    transaction.executeSql(`select * from users`, [], (_, { rows }) => {
      console.log(`users:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with transaction ${err}`)
  })
}

export const obtainFullDb = () => {
  return 'something';
}

