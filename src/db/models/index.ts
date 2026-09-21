import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  DataTypes,
  Sequelize,
  type Dialect,
  type Model,
  type ModelStatic,
} from "sequelize";
import configs from "../../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

type ModelWithAssociate = ModelStatic<Model> & {
  associate?: (db: Db) => void;
};

type Db = {
  [modelName: string]: ModelWithAssociate | Sequelize | typeof Sequelize;
} & {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
};

const env = (process.env.NODE_ENV || "development") as keyof typeof configs;
const config = configs[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect as Dialect,
  },
);

const models: Record<string, ModelWithAssociate> = {};

const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    (file.endsWith(".ts") || file.endsWith(".js")) &&
    !file.endsWith(".d.ts") &&
    file.indexOf(".test.") === -1
  );
});

for (const file of modelFiles) {
  const mod = await import(pathToFileURL(path.join(__dirname, file)).href);
  const model: ModelWithAssociate = mod.default(sequelize, DataTypes);
  models[model.name] = model;
}

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate({ ...models, sequelize, Sequelize } as Db);
  }
});

const db = { ...models, sequelize, Sequelize } as Db;

export default db;
