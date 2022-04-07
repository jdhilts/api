// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    version: '8.7.3',
    connection: {
      host : '127.0.0.1',
      user : 'jameshilts',
      password : '',
      database : 'users_testdb',
      charset: 'utf8'
    }
  },
  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    }
  }
};