import * as SQLite from 'expo-sqlite';
import { Database } from 'expo-sqlite';
import { ddl } from './SQL/ddl.sql';
import { populateRoles, populateUsers } from './SQL/queries.sql';
import {  } from './SQL/triggers.sql';

let db: Database = null;

export const initializeDb = () => {
  this.db = SQLite.openDatabase('lookinnabook.db', '1.0', 'LookinnaBook Database', 20000);
}

export const clearDb = () => {
  
}

export const obtainFullDb = () => {
  return 'something';
}