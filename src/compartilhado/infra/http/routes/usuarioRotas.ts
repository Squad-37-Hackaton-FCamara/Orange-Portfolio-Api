import express from 'express'
import { ControladorUsuario } from '../../../../modulos/usuario/controladores/ControladorUsuario'

const usuarioRotas = express()

usuarioRotas.post('/cadastro', new ControladorUsuario().criar)

export { usuarioRotas }
