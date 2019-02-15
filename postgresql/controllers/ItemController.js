const { Pool } = require('pg');
const dbConfig = require('../config/db');

// Create new item
exports.createNewItem = (req, res) => {
  const item = req.body;
  const query = {
    text: 'insert into items (name, color, price) values ($1, $2, $3)',
    values: [item.name, item.color, item.price],
  };
  const pool = new Pool(dbConfig);

  pool.query(query, (error, result) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    } else {
      res.status(201).json({
        msg: 'Item successfully created.',
        data: {
          item,
        },
      });
    }
  });

  pool.end();
};

// Read all items
exports.getAllItems = (req, res) => {
  const query = 'select * from items';
  const pool = new Pool(dbConfig);

  pool.query(query, (error, result) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    } else {
      res.status(200).json({
        msg: 'Success',
        data: {
          items: result.rows,
        },
      });
    }
  });

  pool.end();
};

// Update an item
exports.updateItemById = (req, res) => {
  const item = req.body;
  const query = {
    text: 'update items set name = $1, color = $2, price = $3 where id = $4',
    values: [item.name, item.color, item.price, item.id],
  };

  if (req.params.id !== item.id) {
    res.status(400).json({
      msg: 'Id\'s are not identical',
    });
    return;
  }

  const pool = new Pool(dbConfig);

  pool.query(query, (error, result) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    } else {
      res.status(200).json({
        msg: 'Item successfully updated',
        data: {
          item,
        },
      });
    }
  });

  pool.end();
};

// Delete an existing item
exports.deleteItemById = (req, res) => {
  const { id } = req.params;
  const query = {
    text: 'delete from items where id = $1',
    values: [id],
  };
  const pool = new Pool(dbConfig);

  pool.query(query, (error, result) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    } else {
      res.status(200).json({
        msg: 'Success',
        data: id,
      });
    }
  });

  pool.end();
};
