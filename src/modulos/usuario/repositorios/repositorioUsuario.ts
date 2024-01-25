import { hash } from 'bcrypt'
import prismaCliente from '../../../compartilhado/infra/prisma'
import { ICriarUsuario } from '../interfaces/ICriarUsuario'
import { IRepositorioUsuario } from '../interfaces/IRepositorioUsuario'
import { IUsuario } from '../interfaces/IUsuario'

class RepositorioUsuario implements IRepositorioUsuario {
    public async criar({
        nome,
        sobrenome,
        email,
        senha
    }: ICriarUsuario): Promise<IUsuario> {
        // Verifica se o email já foi cadastrado
        let usuarioExistente = await prismaCliente.usuario.findFirst({
            where: { email }
        })

        if (usuarioExistente) {
            // TODO Aguardando a implementação do tratamento de erros.
        }

        // Criptografa a senha
        const senhaCriptografada = await hash(senha, 8)

        const usuario = prismaCliente.usuario.create({
            data: {
                nome,
                sobrenome,
                email,
                senha: senhaCriptografada
            }
        })

        return usuario
    }
}

export { RepositorioUsuario }
