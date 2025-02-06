import Dexie from 'dexie';

export const db = new Dexie('mezanno');
db.version(1).stores({
  lists: '&id, name, content',
});

