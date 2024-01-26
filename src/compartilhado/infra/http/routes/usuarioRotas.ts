import { ControladorAutenticacao } from '@modulos/usuario/controladores/ControladorAutenticacao'
import { ControladorUsuario } from '@modulos/usuario/controladores/ControladorUsuario'
import express from 'express'

const usuarioRotas = express()

usuarioRotas.post('/cadastro', new ControladorUsuario().criar)
usuarioRotas.post('/entrar', new ControladorAutenticacao().autenticar)

export { usuarioRotas }
