import { sequelize } from "./sequelize";

let initialized = false;

export async function initDB() {
  if (!initialized) {
    await sequelize.authenticate();
    initialized = true;
  }
}
