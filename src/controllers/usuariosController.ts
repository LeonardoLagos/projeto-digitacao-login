import { Request, Response } from 'express';
import { UsuariosService } from 'src/services/usuariosService';

export class UsuariosController {
    usuariosService: UsuariosService;

    constructor(usuariosService = new UsuariosService()) {
        this.usuariosService = usuariosService;
    }

    loginUsuarios = async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body;
            const usuario = await this.usuariosService.getUsuario(email, senha);

            if (usuario instanceof Error) {
                return res.status(400).json({ message: usuario.message });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ message: 'Erro no login!' });
        }
    }

    cadastroUsuarios = async (req: Request, res: Response) => {
        try {
            const { nome, email, senha, googleId } = req.body;
            const usuario = await this.usuariosService.cadastroUsuario(nome, email, senha, googleId);

            if (usuario instanceof Error) {
                return res.status(400).json({ message: usuario.message });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ message: 'Erro no cadastro!' });
        }
    }
}