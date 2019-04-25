// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class company extends Model {

  static get tableName() {
    return 'company';
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  // const db = app.get('knex');

  // db.schema.hasTable('company').then(exists => {
  //   if (!exists) {
  //     db.schema.createTable('company', table => {
  //       table.increments('id');
  //       table.string('text');
  //       table.timestamp('createdAt');
  //       table.timestamp('updatedAt');
  //     })
  //       .then(() => console.log('Created company table')) // eslint-disable-line no-console
  //       .catch(e => console.error('Error creating company table', e)); // eslint-disable-line no-console
  //   }
  // })
  //   .catch(e => console.error('Error creating company table', e)); // eslint-disable-line no-console

  return company;
};
