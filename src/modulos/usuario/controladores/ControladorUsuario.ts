import { Request, Response } from 'express'
import { RepositorioUsuario } from '../repositorios/RepositorioUsuario'
import { ServicoCriarUsuario } from '../servicos/ServicoCriarUsuario'

class ControladorUsuario {
    public async criar(req: Request, res: Response): Promise<Response> {
        const { nome, sobrenome, email, senha } = req.body

        const servicoCriarUsuario = new ServicoCriarUsuario(
            new RepositorioUsuario()
        )

        const usuario = await servicoCriarUsuario.executar({
            nome,
            sobrenome,
            email,
            senha
        })

        return res.status(201).json(usuario)
    }
}

export { ControladorUsuario }
