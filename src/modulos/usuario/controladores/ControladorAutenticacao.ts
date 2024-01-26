import { Request, Response } from 'express'
import { RepositorioAutenticacao } from '../repositorios/RepositorioAutenticacao'
import { ServicoAutenticacao } from '../servicos/ServicoAutenticacao'

class ControladorAutenticacao {
    public async autenticar(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body

        const servicoCriarUsuario = new ServicoAutenticacao(
            new RepositorioAutenticacao()
        )

        const usuario = await servicoCriarUsuario.executar({
            email,
            senha
        })

        return res.status(200).json(usuario)
    }
}

export { ControladorAutenticacao }
