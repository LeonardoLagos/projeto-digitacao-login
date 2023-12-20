import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: '15.228.13.22',
    port: 5432,
    username: 'postgres',
    password: 'a',
    database: 'projetodigitacao',
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