import PouchDB from 'pouchdb';
import { Platform } from 'react-native';

if (Platform.OS !== 'web') {
  PouchDB.plugin(require('pouchdb-adapter-asyncstorage'));
}

const db = new PouchDB('data');

export default db;
