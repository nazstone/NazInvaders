import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
SQLite.DEBUG(false);

let db = null;

const init = async () => {
  db = await SQLite.openDatabase({
    name: 'invaders.sqlite3',
    createFromLocation: 1,
  });
  await db.executeSql(`
  CREATE TABLE IF NOT EXISTS pref_config (
    city text
  )`);
  try {
    await db.executeSql('ALTER TABLE ITEM ADD column pin');
  } catch (error) {}
};

const getPref = async () => {
  return await exec('select * from pref_config');
};

const setPref = async ({ city }) => {
  const pref = await getPref();

  const query =
    pref.length > 0
      ? 'update pref_config set city = ?'
      : 'insert into pref_config (city) values (?)';

  await exec(query, [city]);
};

const getItemCount = async ({ city }) => {
  let where = 'where 1=1';
  if (city) {
    where += ' and city = ?';
  }
  const valueArray = city ? [city] : [];
  const res = await exec(
    `SELECT count(1) as "counter" FROM item ${where}`,
    valueArray
  );
  return (res.item && res.item(0).counter) || 0;
};

const getItemPaginate = async ({ city }, { limit, offset }) => {
  let where = 'where 1=1';
  if (city) {
    where += ' and city = ?';
  }
  const valueArray = city ? [city] : [];
  const res = await exec(
    `SELECT * FROM item ${where} order by name limit ${limit} offset ${offset}`,
    valueArray
  );
  return res;
};

const getCities = async () => {
  const res = await exec(
    'SELECT city as name, count(1) as "count" FROM item group by city'
  );
  return res;
};

const getComments = async (itemid) => {
  const res = await exec(
    `
    SELECT rowid as id, comment, date, author 
    FROM item_comment 
    where itemid = ? `,
    [itemid]
  );
  return res;
};
const getItem = async (itemid) => {
  const res = await exec(
    `
    SELECT * 
    FROM item 
    where rowid = ?`,
    [itemid]
  );
  return res;
};

const savePin = async (item) => {
  await exec('update item set pin = ? where id = ?', [item.pin, item.id]);
};

const setItemFounded = async (item) => {
  await exec('update item set founded = ? where id = ?', [
    item.founded,
    item.id,
  ]);
};

const exec = async (query, args = []) => {
  const [r] = await db.executeSql(query, args);
  return r.rows || undefined;
};

export {
  init,
  getItem,
  getItemCount,
  getItemPaginate,
  getCities,
  getPref,
  setPref,
  getComments,
  savePin,
  setItemFounded,
};
