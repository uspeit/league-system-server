import Sequelize from 'sequelize';

var dbStore;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'dev') {
  dbStore = 'data/store.db'
} else if (process.env.NODE_ENV === 'test') {
  dbStore = 'data/test.db'
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStore
});

export default sequelize