const mysqlx = require('@mysql/xdevapi');
const dbConfig = require('../config/db');

// Create new item
exports.createNewItem = (req, res) => {
  const { name, color, price } = { ...req.body };
  mysqlx
    .getSession(dbConfig)
    .then(session => session.getSchema(dbConfig.schema).getTable('items'))
    .then(table => table
      .insert(['name', 'color', 'price'])
      .values(name, color, price)
      .execute(item => item)).then((result) => {
      if (result.getAffectedItemsCount() === 0) {
        res.status(500).json({
          msg: 'An error occured',
        });
      }

      if (result.getAffectedItemsCount() === 1) {
        res.status(201).json({
          msg: 'Item successfully added',
          data: {
            item: req.body,
          },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        error: error.info.msg,
      });
    });
};

// Read all items
exports.getAllItems = (req, res) => {
  const results = [];
  mysqlx
    .getSession(dbConfig)
    .then(session => session.getSchema(dbConfig.schema).getTable('items'))
    .then(items => items.select().execute(row => results.push((row))))
    // As objects
    // .then(items => items.select().execute(row => results.push({
    //   id: row[0], name: row[1], price: row[2], color: row[3],
    // })))
    .then(() => {
      if (!results || results === null) {
        res.status(500).json({
          msg: 'An error occured',
        });
      }

      if (results && results !== null) {
        res.status(200).json({
          msg: 'All items',
          data: {
            items: results,
          },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        error: error.info.msg,
      });
    });
};

// Update an item
exports.updateItemById = (req, res) => {
  const {
    id, name, color, price,
  } = { ...req.body };
  if (id !== req.params.id) {
    res.status(400).json({
      msg: "Id's not identical",
    });
  }

  mysqlx
    .getSession(dbConfig)
    .then(session => session.getSchema(dbConfig.schema).getTable('items'))
    .then(items => items
      .update()
      .where(`id = "${id}"`)
      .set('name', name)
      .set('color', color)
      .set('price', price)
      .execute())
    .then((result) => {
      if (result.getAffectedItemsCount() === 0) {
        res.status(500).json({
          msg: 'An error occured',
        });
      }

      if (result.getAffectedItemsCount() === 1) {
        res.status(201).json({
          msg: 'Item successfully updated',
          data: {
            item: req.body,
          },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        error: error.info.msg,
      });
    });
};

// Delete an existing item
exports.deleteItemById = (req, res) => {
  const { id } = { ...req.params };
  mysqlx
    .getSession(dbConfig)
    .then(session => session.getSchema(dbConfig.schema).getTable('items'))
    .then(items => items.delete().where(`id = ${id}`).execute())
    .then((result) => {
      if (result.getAffectedItemsCount() === 0) {
        res.status(400).json({
          msg: 'An item with this id does not exists or may have been deleted',
        });
      }
      if (result.getAffectedItemsCount() === 1) {
        res.status(200).json({
          msg: 'Item deleted successfully.',
          data: id,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        error: error.info,
      });
    });
};
