import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import { errorHandler } from './middleware/error.middleware';
import {requestLogger}  from './middleware/logger.middleware';
import  sequelize  from './config/database';

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

// routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// global error handling
app.use(errorHandler);

// wait for db connection and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
