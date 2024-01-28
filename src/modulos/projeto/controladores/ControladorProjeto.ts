import { Request, Response } from 'express'
import { RepositorioProjeto } from '../repositorios/repositorioProjeto'
import { ServicoCriarProjeto } from '../servicos/ServicoCriarProjeto'
import { ServicoListarProjeto } from '../servicos/ServicoListarProjeto'
import { ServicoEditarProjeto } from '../servicos/ServicoEditarProjeto'
import { ServicoListarPeloUserIdProjeto } from '../servicos/ServicoListarPeloUserIdProjeto'
import { ServicoExcluirProjeto } from '../servicos/ServicoExcluirProjeto'

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

    public async editar(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { titulo, tags, link, descricao, foto, usuario_id } = req.body

        const servicoEditarProjeto = new ServicoEditarProjeto(
            new RepositorioProjeto()
        )

        const projeto = await servicoEditarProjeto.executar(id, {
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

    public async listarPeloUserId(req: Request, res: Response): Promise<Response> {
        const { usuario_id } = req.params

        const servicoListarPeloUserIdProjeto = new ServicoListarPeloUserIdProjeto(
            new RepositorioProjeto()
        )

        const projetos = await servicoListarPeloUserIdProjeto.executar(usuario_id)

        return res.status(201).json(projetos)
    }

    public async excluir(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const servicoExcluirProjeto = new ServicoExcluirProjeto(
            new RepositorioProjeto()
        )
        
        const projeto = await servicoExcluirProjeto.executar(id)

        return res.status(200).json({mensagem: 'O projeto foi deletado com sucesso.'})
    }
}

export { ControladorProjeto }
