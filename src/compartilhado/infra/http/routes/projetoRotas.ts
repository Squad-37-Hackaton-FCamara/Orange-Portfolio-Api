import express from 'express'
import { ControladorProjeto } from '../../../../modulos/projeto/controladores/ControladorProjeto'
import { tratamentoImagemIntermediario } from '../middlewares/salvarImagemMidleware'

const projetoRotas = express()

projetoRotas.get('/projeto', new ControladorProjeto().listar)
projetoRotas.get('/projeto/:usuario_id', new ControladorProjeto().listarPeloUserId)
projetoRotas.post('/projeto', tratamentoImagemIntermediario, new ControladorProjeto().criar)
projetoRotas.put('/projeto/:id', tratamentoImagemIntermediario, new ControladorProjeto().editar)
projetoRotas.delete('/projeto/:id', new ControladorProjeto().excluir)


export { projetoRotas }
