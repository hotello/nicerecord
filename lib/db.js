import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { Platform } from 'react-native';

PouchDB.plugin(PouchFind);

if (Platform.OS !== 'web') {
  PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
}

const db = new PouchDB('data');

// Create index to find by type
db.createIndex({
  index: { fields: ['type'] },
});

export default db;
