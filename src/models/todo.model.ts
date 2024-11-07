import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user.model';

interface TodoAttributes {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
}

interface TodoCreationAttributes
  extends Optional<TodoAttributes, 'id' | 'completed'> {}

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public userId!: number;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'todos',
    sequelize,
  }
);

// relations
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });
