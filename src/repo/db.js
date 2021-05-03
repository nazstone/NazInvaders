import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(false);
SQLite.DEBUG(false);

let db = null;

const init = () => {
  return new Promise((res, rej) => {
    db = SQLite.openDatabase({
      name: 'invaders.sqlite3',
      createFromLocation: 1,
    });
    db.transaction(function (txn) {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS pref_config (
          city text
        )`,
        [],
        function (tx, res) {
          res();
        }
      );
    });
  });
};

const getPref = () => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql('select * from pref_config', [], (tx, rs) => {
        res(rs.rows);
      });
    });
  });
};
const setPref = ({ city }) => {
  return new Promise(async (res, rej) => {
    try {
      const pref = await getPref();

      const query =
        pref.length > 0
          ? 'update pref_config set city = ?'
          : 'insert into pref_config (city) values (?)';

      db.executeSql(
        query,
        [city],
        (tx, rs) => {
          res();
        },
        (err) => {
          rej(err);
        }
      );
    } catch (error) {
      rej(error);
    }
  });
};

const getItemCount = ({ city }, callback) => {
  db.transaction(function (txn) {
    let where = 'where 1=1';
    if (city) {
      where += ' and city = ?';
    }
    const valueArray = city ? [city] : [];
    txn.executeSql(
      `SELECT count(1) as "counter" FROM item ${where}`,
      valueArray,
      (tx, res) => {
        callback(res.rows.item(0).counter);
      }
    );
  });
};

const getItemPaginate = ({ city }, { limit, offset }, callback) => {
  db.transaction(function (txn) {
    let where = 'where 1=1';
    if (city) {
      where += ' and city = ?';
    }
    const valueArray = city ? [city] : [];
    txn.executeSql(
      `SELECT * FROM item ${where} order by name limit ${limit} offset ${offset}`,
      valueArray,
      (tx, res) => {
        callback(res.rows);
      }
    );
  });
};

const cities = (callback) => {
  db.transaction(function (txn) {
    txn.executeSql(
      'SELECT city as name, count(1) as "count" FROM item group by city',
      [],
      function (tx, res) {
        callback(res.rows);
      }
    );
  });
};

const getComments = (itemid) => {
  return new Promise((res, rej) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT rowid as id, comment, date, author FROM item_comment where itemid = ? order by date desc',
        [itemid],
        function (tx, rs) {
          res(rs.rows);
        },
        (err) => {
          rej(err);
        }
      );
    });
  });
};

export {
  init,
  getItemCount,
  getItemPaginate,
  cities,
  getPref,
  setPref,
  getComments,
};
