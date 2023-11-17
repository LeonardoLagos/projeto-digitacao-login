import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'a',
    database: 'projetoDigitacao',
    synchronize: false,
    logging: true,
    entities: ['src/database/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: '_migrations',

})