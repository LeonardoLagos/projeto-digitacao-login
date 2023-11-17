import { Usuarios } from "src/database/entities/usuarios";
import { Repository } from "typeorm";
import { dataSource as db } from "src/database/dataSource";

export class UsuariosService {
    usuariosRepository: Repository<Usuarios>;

    constructor(usuariosRepository = db.getRepository(Usuarios)) {
        this.usuariosRepository = usuariosRepository;
    }

    async getUsuarioById(id: number) {
        const itemDb = await this.usuariosRepository.findOne({where: {id: id}});
        if(!itemDb){
            throw new Error('Usuario não encontrado!');
        }
        return itemDb;
    }

    async getUsuario(email: string, senha: string) {
        const itemDb = await this.usuariosRepository.findOne({where: {email: email, senha: senha}});
        if(!itemDb){
            throw new Error('Usuario não encontrado!');
        }
        return itemDb;
    }

    async cadastroUsuario(nome: string, email: string, senha: string, googleId: string) {
        const itemDb = await this.usuariosRepository.findOne({where: {email: email, googleId: googleId}});

        if(itemDb){
            throw new Error('Usuario já cadastrado!');
        }
        
        const usuario = new Usuarios();
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha;
        await this.usuariosRepository.save(usuario);
        return usuario;
    }
}