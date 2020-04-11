import * as SQLite from 'expo-sqlite';
import { Database } from 'expo-sqlite';

let db: Database = null;

export const initializeDb = () => {
  this.db = SQLite.openDatabase('lookinnabook.db', '1.0', 'LookinnaBook Database', 20000);
}

export const obtainFullDb = () => {
  return 'something';
}