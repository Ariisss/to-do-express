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