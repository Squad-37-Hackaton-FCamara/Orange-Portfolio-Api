import prismaCliente from '../../../compartilhado/infra/prisma'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { AppError } from '../../../compartilhado/errors/AppError'

class RepositorioProjeto implements IRepositorioProjeto {
    public async criar({
        titulo,
        tags,
        link,
        descricao,
        foto,
        usuario_id
    }: ICriarProjeto): Promise<IProjeto> {

        const usuarioExistente = await prismaCliente.usuario.findFirst({
            where: { id: usuario_id }
        })

        if (!usuarioExistente) {
            throw new AppError("Usuário não existe na base de dados.", 404)
        }

        const linkExistente = await prismaCliente.projeto.findFirst({
            where: { link }
        })

        if (linkExistente) {
            throw new AppError("Já existe um projeto com esse link na base de dados.", 409)
        }

        const projeto = prismaCliente.projeto.create({
            data: {
                titulo,
                tags,
                link,
                descricao,
                foto,
                usuario_id
            }
        })

        return projeto
    }
}

export { RepositorioProjeto }
