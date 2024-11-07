import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user.model';

interface TodoAttributes {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  user_id: number;
}

interface TodoCreationAttributes
  extends Optional<TodoAttributes, 'id' | 'is_completed'> {}

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public is_completed!: boolean;
  public user_id!: number;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'todos',
    sequelize,
    underscored: true,
    timestamps: true,
  }
);

// relations
User.hasMany(Todo, { foreignKey: 'user_id' });
Todo.belongsTo(User, { foreignKey: 'user_id' });
