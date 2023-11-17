import { Usuarios } from "src/database/entities/usuarios";
import { Repository } from "typeorm";

export class UsuariosService {
    usuariosRepository: Repository<Usuarios>;

    constructor(usuariosRepository) {
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
}