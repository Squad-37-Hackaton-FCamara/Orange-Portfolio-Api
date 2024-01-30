import autenticacaoConfig from '@config/autenticacao'
import { compare } from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'
import prismaCliente from 'src/compartilhado/infra/prisma'
import { IAutenticacao } from '../interfaces/IAutenticacao'
import { IRepositorioAutenticacao } from '../interfaces/IRepositorioAutenticacao'
import { IUsuarioAutenticado } from '../interfaces/IUsuarioAutenticado'
import { ErroPersonalizado } from 'src/compartilhado/erros/Erros'

export class RepositorioAutenticacao implements IRepositorioAutenticacao {
    public async autenticar({
        email,
        senha
    }: IAutenticacao): Promise<IUsuarioAutenticado> {

        const usuario = await prismaCliente.usuario.findFirst({
            where: { email },
            include: { projetos: true }
        })

        if (!usuario) {
            throw new ErroPersonalizado('E-mail ou senha incorretos!', 400)
        }

        const senhaVerificada = await compare(senha, usuario.senha)

        if (!senhaVerificada) {
            throw new ErroPersonalizado('E-mail ou senha incorretos!', 400)
        }

        const token = sign(
            { id: usuario.id },

            autenticacaoConfig.jwt.secret as Secret,
            {
                subject: usuario.id,
                expiresIn: autenticacaoConfig.jwt.expiresIn
            }
        )

        return {
            usuario,
            token
        }
    }
}
