const Sequelize = require('sequelize');
const db = new Sequelize('teknoloji-elcileri', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});
async function test(){
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
test();
module.exports = db;