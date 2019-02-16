const { Pool, Client } = require('pg');
const dbConfig = require('../config/db');

const pool = new Pool(dbConfig);

const addNewItem = (item, res) => {
  const query = {
    text: 'insert into items (name, color, price) values ($1, $2, $3)',
    values: [item.name, item.color, item.price],
  };
  return pool.query(query);
};

const getAllItems = () => {
  const query = 'select * from item';
  return pool.query(query);
};

const updateItem = (item) => {
  const query = {
    text: 'update items set name = $1, color = $2, price = $3 where id = $4',
    values: [item.name, item.color, item.price, item.id],
  };

  return pool.query(query);
};

const deleteItem = (id) => {
  const query = {
    text: 'delete from items where id = $1',
    values: [id],
  };

  return pool.query(query);
};

module.exports = {
  addNewItem, getAllItems, updateItem, deleteItem,
};
