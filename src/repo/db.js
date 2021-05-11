import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(false);
SQLite.DEBUG(false);

let db = null;

const init = () => {
  return new Promise(async (resolve) => {
    db = SQLite.openDatabase({
      name: 'invaders.sqlite3',
      createFromLocation: 1,
    });
    await exec(`
          CREATE TABLE IF NOT EXISTS pref_config (
            city text
          )`);
    const res = await exec('PRAGMA table_info(item)');
    let found = false;
    for (let i = 0; i < res.length; i += 1) {
      if (res.item(i).name === 'pin') {
        found = true;
      }
    }
    if (!found) {
      await exec('ALTER TABLE ITEM ADD column pin');
    }
    resolve();
  });
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

const getItemCount = async ({ city }, callback) => {
  let where = 'where 1=1';
  if (city) {
    where += ' and city = ?';
  }
  const valueArray = city ? [city] : [];
  const res = await exec(
    `SELECT count(1) as "counter" FROM item ${where}`,
    valueArray
  );
  callback(res.item(0).counter);
};

const getItemPaginate = async ({ city }, { limit, offset }, callback) => {
  let where = 'where 1=1';
  if (city) {
    where += ' and city = ?';
  }
  const valueArray = city ? [city] : [];
  const res = await exec(
    `SELECT * FROM item ${where} order by name limit ${limit} offset ${offset}`,
    valueArray
  );
  callback(res);
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
    where itemid = ? 
    order by date desc`,
    [itemid]
  );
  return res;
};

const savePin = async (item) => {
  await exec('update item set pin = ? where id = ?', [item.pin, item.id]);
};

const exec = (query, args = []) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(query, args, (tx, rs) => {
        res(rs.rows);
      });
    });
  });
};

export {
  init,
  getItemCount,
  getItemPaginate,
  getCities,
  getPref,
  setPref,
  getComments,
  savePin,
};
