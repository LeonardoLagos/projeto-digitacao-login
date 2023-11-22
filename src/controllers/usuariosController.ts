import { Request, Response } from 'express';
import { UsuariosService } from '../services/usuariosService';

export class UsuariosController {
    usuariosService: UsuariosService;

    constructor(usuariosService = new UsuariosService()) {
        this.usuariosService = usuariosService;
    }

    loginUsuarios = async (req: Request, res: Response) => {
        try {
            const { email, senha, googleId } = req.body;
            const usuario = await this.usuariosService.loginUsuario(email, senha, googleId);

            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    buscaUsuarioPorToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const usuario = await this.usuariosService.buscaUsuarioPorToken(token);

            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    cadastroUsuarios = async (req: Request, res: Response) => {
        try {
            const { nome, email, senha, google_id, foto_perfil } = req.body;
            const usuario = await this.usuariosService.cadastroUsuario(nome, email, senha, google_id, foto_perfil);

            if (usuario instanceof Error) {
                return res.status(400).json({ message: usuario.message });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message});
        }
    }
}