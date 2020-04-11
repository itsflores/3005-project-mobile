import * as SQLite from 'expo-sqlite';
import { Database } from 'expo-sqlite';
import { ddl } from './SQL/ddl.sql';
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
    transaction.executeSql(Q.clearTables, [], (_, { rows }) => {
      console.log(`cleared tables:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with clearing ${err}`)
  })
}

export const populateDb = () => {
  db.transaction((transaction) => {
    // transaction.executeSql(ddl, [], (_, { rows }) => {
    //   console.log(`created tables:`)
    //   console.log(rows);
    // })

    transaction.executeSql(`
      ${Q.populateRoles}
      ${Q.populateUsers}
    `, [], (_, { rows }) => {
      console.log(`populated:`)
      console.log(rows);
    })
  }, (err) => {
    console.log(`Error with transaction ${err}`)
  })
}

export const obtainFullDb = () => {
  return 'something';
}

