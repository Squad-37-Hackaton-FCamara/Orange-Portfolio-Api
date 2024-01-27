import express from 'express'
import { ControladorProjeto } from '../../../../modulos/projeto/controladores/ControladorProjeto'

const projetoRotas = express()

projetoRotas.get('/projeto', new ControladorProjeto().listar)
projetoRotas.get('/projeto/:userId')
projetoRotas.post('/projeto', new ControladorProjeto().criar)
projetoRotas.put('/projeto')
projetoRotas.delete('/projeto')


export { projetoRotas }
