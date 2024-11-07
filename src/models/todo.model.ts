import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";

interface TodoAttributes {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
  }


interface TodoCreationAttributes {
    user_id: string;
    title: string;
    description?: string;
}

// define todo model for sequelize
class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
    declare id: string;
    declare user_id: string;
    declare title: string;
    declare description: string | null;
    declare is_completed: boolean;
    declare created_at: Date;
    declare updated_at: Date;
  }

  // init sequelize todo model w/ options
Todo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'todos',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  // relationships
  Todo.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Todo, { foreignKey: 'user_id' });
  
  export default Todo;