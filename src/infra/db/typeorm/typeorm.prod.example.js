module.exports = {
  type: '',
  host: '',
  database: '',
  synchronize: false,
  port: 5432,
  username: '',
  password: '',
  entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')],
};
