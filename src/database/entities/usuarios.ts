import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("usuarios")
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number;
    
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
}