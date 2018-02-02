import Ember from 'ember';
import PouchDB from 'pouchdb';
import PouchAdapterMemory from 'npm:pouchdb-adapter-memory';

const MOCK_USER_DATA = [{
  'id': 'org.couchdb.user:hradmin',
  'key': 'org.couchdb.user:hradmin',
  'value': { 'rev': '1-242f3d5b5eb8596144f8a6300f9f5a2f' },
  'doc': {
    '_id': 'org.couchdb.user:hradmin',
    '_rev': '1-242f3d5b5eb8596144f8a6300f9f5a2f',
    'password_scheme': 'pwdscheme',
    'iterations': 10,
    'name': 'hradmin',
    'roles': ['System Administrator', 'admin', 'user'],
    'type': 'user',
    'userPrefix': 'p',
    'derived_key': 'derivedkeyhere',
    'salt': 'saltgoeshere',
    'displayName': 'HospitalRun Administrator',
    'email': 'hradmin@hospitalrun.io'
  }
}, {
  'id': 'org.couchdb.user:joe@donuts.com',
  'key': 'org.couchdb.user:joe@donuts.com',
  'value': {
    'rev': '1-ef3d54502f2cc8e8f73d8547881f0836'
  },
  'doc': {
    '_id': 'org.couchdb.user:joe@donuts.com',
    '_rev': '1-ef3d54502f2cc8e8f73d8547881f0836',
    'password_scheme': 'pbkdf2',
    'iterations': 10,
    'displayName': 'Joe Bagadonuts',
    'email': 'joe@donuts.com',
    'name': 'joe@donuts.com',
    'roles': ['Hospital Administrator', 'user'],
    'userPrefix': 'p01',
    'type': 'user',
    'derived_key': 'derivedkeyhere',
    'salt': 'saltgoeshere'
  }
}];

export default Ember.Test.registerAsyncHelper('addOfflineUsersForElectron', function() {
  if (window.ELECTRON) {
    return wait().then(() => {
      PouchDB.plugin(PouchAdapterMemory);
      let usersDB = new PouchDB('_users', {
        adapter: 'memory'
      });
      let [, joeUser] = MOCK_USER_DATA; // hradmin already added by run-with-pouch-dump
      delete joeUser.doc._rev;
      return usersDB.put(joeUser.doc);
    });
  } else {
    return wait();
  }
});
