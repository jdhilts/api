
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jameshilts',
      password : '',
      database : 'users_testdb',
      useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection:{
      connectionString: process.env.DATABASE_URL,
      useNullAsDefault: true,
      ssl:{
        rejectionUnauthorized: false
      }
    }
  }   
};
