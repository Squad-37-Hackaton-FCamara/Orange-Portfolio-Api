import autenticacaoConfig from '@config/autenticacao'
import { compare } from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'
import { AppError } from 'src/compartilhado/errors/AppError'
import prismaCliente from 'src/compartilhado/infra/prisma'
import { IAutenticacao } from '../interfaces/IAutenticacao'
import { IRepositorioAutenticacao } from '../interfaces/IRepositorioAutenticacao'
import { IUsuarioAutenticado } from '../interfaces/IUsuarioAutenticado'

export class RepositorioAutenticacao implements IRepositorioAutenticacao {
    public async autenticar({
        email,
        senha
    }: IAutenticacao): Promise<IUsuarioAutenticado> {
        // Verificar se o email existe no banco de dados
        const usuario = await prismaCliente.usuario.findFirst({
            where: { email },
            include: { projetos: true }
        })

        if (!usuario) {
            throw new AppError('Usuário/senha incorreto', 401)
        }

        // Verificar se a senha está correta
        const senhaVerificada = await compare(senha, usuario.senha)

        if (!senhaVerificada) {
            throw new AppError('Usuário/senha incorreto', 401)
        }

        // Gerar token
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
