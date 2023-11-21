import { Usuarios } from "../database/entities/usuarios";
import { Repository } from "typeorm";
import { dataSource as db } from "../database/dataSource";

export class UsuariosService {
    usuariosRepository: Repository<Usuarios>;

    constructor(usuariosRepository = db.getRepository(Usuarios)) {
        this.usuariosRepository = usuariosRepository;
    }
    
    async loginUsuario(email: string, senha: string, googleId: string) {
        const itemDb = await this.usuariosRepository.findOne({where: {email: email, senha: senha, google_id: googleId}});
        if(!itemDb){
            throw new Error('Usuário e/ou senha incorretos!');
        }
        return itemDb;
    }

    async cadastroUsuario(nome: string, email: string, senha: string, googleId: string, fotoPerfil: string) {
        const itemDb = await this.usuariosRepository.findOne({where: {email: email, google_id: googleId, foto_perfil: fotoPerfil}});

        if(itemDb){
            throw new Error('Usuario já cadastrado!');
        }
        
        const usuario = new Usuarios();
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha;
        usuario.google_id = googleId;
        usuario.foto_perfil = fotoPerfil;
        await this.usuariosRepository.save(usuario);
        return usuario;
    }
}