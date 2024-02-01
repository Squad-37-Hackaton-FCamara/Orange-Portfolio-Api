import { Request, Response } from 'express'
import { RepositorioAutenticacao } from '../repositorios/RepositorioAutenticacao'
import { ServicoAutenticacao } from '../servicos/ServicoAutenticacao'

class ControladorAutenticacao {
    public async autenticar(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body

        const servicoAutenticarUsuario = new ServicoAutenticacao(
            new RepositorioAutenticacao()
        )

        const usuario = await servicoAutenticarUsuario.executar({
            email,
            senha
        })

        const { id, nome, sobrenome, email: novoEmail } = usuario.usuario
        const resposta = {
            usuario: {id, nome, sobrenome, email: novoEmail},
            token: usuario.token
        };

        return res.status(201).json(resposta)

    }
}

export { ControladorAutenticacao }
