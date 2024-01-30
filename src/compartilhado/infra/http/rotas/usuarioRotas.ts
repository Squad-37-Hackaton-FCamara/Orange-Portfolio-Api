import express from 'express'
import { ControladorAutenticacao } from '@modulos/usuario/controladores/ControladorAutenticacao'
import { ControladorUsuario } from '@modulos/usuario/controladores/ControladorUsuario'
import validarRequisicao from '../intermediario/validarCampos'
import { usuarioSchema } from '../schemas/usuarioSchema'

const usuarioRotas = express()

usuarioRotas.post('/cadastro', validarRequisicao(usuarioSchema), new ControladorUsuario().criar)
usuarioRotas.post('/entrar', new ControladorAutenticacao().autenticar)

export { usuarioRotas }
