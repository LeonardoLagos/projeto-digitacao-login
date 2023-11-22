import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Usuarios1700230688677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'usuarios',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'senha',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'data_cadastro',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'google_id',
                    type: 'varchar'
                },
                {
                    name: 'foto_perfil',
                    type: 'varchar'
                },
                {
                    name: 'status',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios')
    }

}
