import { hash } from 'bcrypt'
import prismaCliente from '../../../compartilhado/infra/prisma'
import { ICriarUsuario } from '../interfaces/ICriarUsuario'
import { IRepositorioUsuario } from '../interfaces/IRepositorioUsuario'
import { IUsuario } from '../interfaces/IUsuario'
import { ErroPersonalizado } from '../../../compartilhado/erros/Erros'


class RepositorioUsuario implements IRepositorioUsuario {
    public async criar({
        nome,
        sobrenome,
        email,
        senha
    }: ICriarUsuario): Promise<IUsuario> {

        let usuarioExistente = await prismaCliente.usuario.findFirst({
            where: { email }
        })

        if (usuarioExistente) {
            throw new ErroPersonalizado('E-mail já cadastrado. Escolha outro e-mail.', 400)
        }

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

    async seUsusarioExiste(email: string): Promise<boolean> {
        let usuarioExistente = await prismaCliente.usuario.findFirst({
            where: { email }
        })

        if (usuarioExistente) {
            return true
        }

        return false
    }
}

export { RepositorioUsuario }
