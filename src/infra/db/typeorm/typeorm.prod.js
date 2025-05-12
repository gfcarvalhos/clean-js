module.exports = {
  type: 'postgres',
  host: 'localhost',
  database: 'biblioteca',
  synchronize: false,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')],
};
