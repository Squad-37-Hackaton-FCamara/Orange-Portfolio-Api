import { Request, Response } from 'express'
import { RepositorioProjeto } from '../repositorios/repositorioProjeto'
import { ServicoCriarProjeto } from '../servicos/ServicoCriarProjeto'

class ControladorProjeto {
    public async criar(req: Request, res: Response): Promise<Response> {
        const { titulo, tags, link, descricao, foto, usuario_id } = req.body

        const servicoCriarProjeto = new ServicoCriarProjeto(
            new RepositorioProjeto()
        )

        const projeto = await servicoCriarProjeto.executar({
            titulo,
            tags,
            link,
            descricao,
            foto,
            usuario_id,
        })

        return res.status(201).json(projeto)
    }
}

export { ControladorProjeto }
