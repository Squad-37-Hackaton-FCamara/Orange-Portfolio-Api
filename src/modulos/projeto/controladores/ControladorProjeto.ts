import { Request, Response } from 'express'
import { RepositorioProjeto } from '../repositorios/repositorioProjeto'
import { ServicoCriarProjeto } from '../servicos/ServicoCriarProjeto'
import { ServicoListarProjeto } from '../servicos/ServicoListarProjeto'

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
            req,
            res

        })

        return res.status(201).json(projeto)
    }

    public async listar(req: Request, res: Response): Promise<Response> {
        
        const servicoListarProjeto = new ServicoListarProjeto(
            new RepositorioProjeto()
        )

        const projetos = await servicoListarProjeto.executar()

        return res.status(201).json(projetos)
    }
}

export { ControladorProjeto }
