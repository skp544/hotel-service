import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "./sequelize.js";

class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>; // declare tell typescript -> existence of variable
  declare name: string;
  declare address: string;
  declare location: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare rating: CreationOptional<number>;
  declare ratingCount: CreationOptional<number>;
}

Hotel.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "STRING",
      allowNull: false,
    },
    address: {
      type: "STRING",
      allowNull: false,
    },
    location: {
      type: "STRING",
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: new Date(),
    },
    rating: {
      type: "FLOAT",
      allowNull: false,
      defaultValue: 0,
    },
    ratingCount: {
      type: "INTEGER",
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "hotels",
    sequelize: sequelize,
    underscored: true, // createdAt --> created_at
    timestamps: true,
  },
);

export default Hotel;

// hotel.create ({name: "", address: "" , location: ""})
