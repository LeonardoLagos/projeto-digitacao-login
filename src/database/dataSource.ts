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

dataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})