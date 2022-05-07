
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jameshilts',
      password : '',
      database : 'users_testdb'
  },
  production: {
    client: 'pg',
    connection:{
      connectionString: process.env.DATABASE_URL,
      ssl:{
        rejectionUnauthorized: false
      }
    }
  }   
};
