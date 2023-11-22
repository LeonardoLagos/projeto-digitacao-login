
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("usuarios")
export class Usuarios {
    @PrimaryColumn("uuid")
    id: string;
    
    @Column()
    nome: string;

    @Column()
    email: string;
    
    @Column()
    senha: string;

    @Column()
    data_cadastro: Date;

    @Column()
    google_id: string;

    @Column()
    foto_perfil: string;

    @Column()
    status: string;
}