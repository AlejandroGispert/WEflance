// models/index.js
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || "development";
let configFile;

try {
  configFile = await import("../config/config.json");
} catch (error) {
  console.error("Failed to load config file:", error);
  throw error;
}

const config = configFile.default[env];
const db = {};

// Database connection setup
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Test the database connection (optional, but recommended for error handling)
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection to the database (${config.database}) has been established successfully.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testConnection();

// Load all models in the current directory dynamically
const files = fs.readdirSync(path.resolve());
for (const file of files) {
  if (
    file.indexOf(".") !== 0 && // Exclude hidden files
    file !== basename && // Exclude the index.js file itself
    file.slice(-3) === ".js" && // Only .js files
    !file.includes(".test.") // Exclude test files
  ) {
    const model = await import(path.join(import.meta.url, file)).then(
      (mod) => mod.default
    );
    db[model.name] = model(sequelize, DataTypes); // Initialize model with sequelize and DataTypes
  }
}

// Setup associations (many-to-many, one-to-many, etc.)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the initialized sequelize instance and Sequelize class
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;