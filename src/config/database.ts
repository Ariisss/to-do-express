import { Sequelize } from 'sequelize';
import env from './environment';

// init sequelize instance
const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// // init database connection
// export async function initializeDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection established.');
    
//     // Sync all models
//     await sequelize.sync({ alter: true }); 
//     console.log('Database synchronized.');
//   } catch (error) {
//     console.error('Unable to connect to database:', error);
//     process.exit(1); // Exit if database connection fails
//   }
// }

export default sequelize;