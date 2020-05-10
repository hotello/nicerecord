import PouchDB from 'pouchdb';
import PouchAsyncStorage from 'pouchdb-adapter-asyncstorage';

PouchDB.plugin(PouchAsyncStorage);

const db = new PouchDB('data');

export default db;
