import { Request, Response } from 'express'
import { RepositorioUsuario } from '../repositorios/repositorioUsuario'
import { ServicoCriarUsuario } from '../servicos/ServicoCriarUsuario'

class ControladorUsuario {
    public async criar(req: Request, res: Response): Promise<Response> {
        let { nome, sobrenome, email, senha } = req.body
        email = email.trim();

        const servicoCriarUsuario = new ServicoCriarUsuario(
            new RepositorioUsuario()
        )

        const usuario = await servicoCriarUsuario.executar({
            nome,
            sobrenome,
            email,
            senha
        })

        const { id, nome: novoNome, sobrenome: novoSobrenome, email: novoEmail } = req.body;

        return res.status(201).json({ id, nome: novoNome, sobrenome: novoSobrenome, email: novoEmail })
    }
}

export { ControladorUsuario }
