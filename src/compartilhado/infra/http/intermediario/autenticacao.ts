import autenticacaoConfig from '@config/autenticacao'
import { NextFunction, Request, Response } from "express"
import { Secret, verify } from "jsonwebtoken"
import { ErroPersonalizado } from 'src/compartilhado/erros/Erros'

interface IToken {
  iat: number
  exp: number
  sub: string
}
export default function autenticado(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const autorizacao = req.headers.authorization

  if (!autorizacao) {
    throw new ErroPersonalizado('Um token válido é esperado!', 400)
  }
  
  const [, token] = autorizacao.split(" ")

  try {
    const tokenDecodificado = verify(token, autenticacaoConfig.jwt.secret as Secret)

    const { sub } = tokenDecodificado as IToken

    req.body = {
      id: sub,
    }

    next()
  } catch {
    throw new ErroPersonalizado('Token inválido!', 400)
  }
}