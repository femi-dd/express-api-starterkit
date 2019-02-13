const mysqlx = require('@mysql/xdevapi');
const db_config = require('../config/db');

// Create new item
exports.createNewItem = (req, res) => {
   const { name, color, price } = { ...req.body };
   mysqlx
      .getSession(db_config)
      .then(session => session.getSchema(db_config.schema).getTable('items'))
      .then(table => {
         return table
            .insert(['name', 'color', 'price'])
            .values(name, color, price)
            .execute((item) => item)
      }).then(result => {
         if (result.getAffectedItemsCount() == 0) {
            res.status(500).json({
               msg: 'An error occured'
            });
         }

         if (result.getAffectedItemsCount() == 1) {
            res.status(201).json({
               msg: 'Item successfully added',
               data: {
                  item: req.body
               }
            });
         }
      })
      .catch(error => {
         res.status(500).json({
            msg: 'An error occured',
            error: error.info.msg
         });
      });
}

// Read all items
exports.getAllItems = (req, res) => {
   let results = [];
   mysqlx
      .getSession(db_config)
      .then(session => session.getSchema(db_config.schema).getTable('items'))
      .then(items => items.select().execute(row => results.push(row)))
      .then(() => {
         if (!results) {
            res.status(500).json({
               msg: 'An error occured'
            });
         }

         if (results) {
            res.status(200).json({
               msg: 'All items',
               data: {
                  items: results
               }
            });
         }
      })
      .catch(error => {
         res.status(500).json({
            msg: 'An error occured',
            error: error.info.msg
         });
      });
}

// Update an item
exports.updateItemById = (req, res) => {
   const { id, name, color, price } = { ...req.body };
   mysqlx
      .getSession(db_config)
      .then(session => session.getSchema(db_config.schema).getTable('items'))
      .then(items => {
         return items
            .update()
            .where(`id = "${id}"`)
            .set('name', name)
            .set('color', color)
            .set('price', price)
            .execute();
      })
      .then(result => {
         if (result.getAffectedItemsCount() == 0) {
            res.status(500).json({
               msg: 'An error occured'
            });
         }

         if (result.getAffectedItemsCount() == 1) {
            res.status(201).json({
               msg: 'Item successfully updated',
               data: {
                  item: req.body
               }
            });
         }
      })
      .catch(error => {
         res.status(500).json({
            msg: 'An error occured',
            error: error.info.msg
         });
      });
}

// Delete an existing item
exports.deleteItemById = (req, res) => {
   const id = req.params.id;
   mysqlx
      .getSession(db_config)
      .then(session => session.getSchema(db_config.schema).getTable('items'))
      .then(items => items.delete().where(`id = "${id}"`).execute())
      .then(result => {
         if (result.getAffectedItemsCount() == 0) {
            res.status(500).json({
               msg: 'An error occured',
               error: error
            });
         }

         if (result.getAffectedItemsCount() == 1) {
            res.status(200).json({
               msg: 'Item deleted successfully.',
               data: id
            })
         }
      })
      .catch(error => {
         res.status(500).json({
            msg: 'An error occured',
            error: error.info.msg
         });
      });
}
