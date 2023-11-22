import jwt from 'jsonwebtoken';
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { dataSource as db } from "../database/dataSource";
import { Usuarios } from "../database/entities/usuarios";

export class UsuariosService {
    usuariosRepository: Repository<Usuarios>;

    constructor(usuariosRepository = db.getRepository(Usuarios)) {
        this.usuariosRepository = usuariosRepository;
    }

    async loginUsuario(email: string, senha: string, googleId: string) {
        let itemDb: Usuarios;
        if (googleId) {
            itemDb = await this.usuariosRepository.findOne({ where: { google_id: googleId } });
        } else {
            itemDb = await this.usuariosRepository.findOne({ where: { email: email, senha: senha } });
        }

        if (!itemDb) {
            throw new Error('Usuário e/ou senha incorretos!');
        }

        if (itemDb.status == 'inativo') {
            throw new Error('Usuário inativo!');
        }

        const token = jwt.sign(
            { id: itemDb.id, email: itemDb.email, nome: itemDb.nome, foto_perfil: itemDb.foto_perfil },
            'teste',
            { expiresIn: 3600 }
        );
        return token;
    }

    async cadastroUsuario(nome: string, email: string, senha: string, googleId: string, fotoPerfil: string) {
        const itemDb = await this.usuariosRepository.findOne({ where: { email: email, google_id: googleId, foto_perfil: fotoPerfil } });

        if (itemDb) {
            throw new Error('Usuario já cadastrado!');
        }
        console.log(uuidv4())
        const usuario = new Usuarios();
        usuario.id = uuidv4();
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha;
        usuario.google_id = googleId;
        usuario.foto_perfil = fotoPerfil;
        usuario.status = 'ativo';
        await this.usuariosRepository.save(usuario);
        return usuario;
    }

    async buscaUsuarioPorToken(token: string) {
        const decoded = jwt.verify(token, 'teste');

        if (!decoded) {
            throw new Error('Usuário não encontrado!');
        }

        return decoded;
    }
}