import express from 'express'
import { ControladorProjeto } from '../../../../modulos/projeto/controladores/ControladorProjeto'
import { tratamentoImagemIntermediario } from '../intermediario/tratarImagem'
import validarRequisicao from '../intermediario/validarCampos'
import { projetoSchema } from '../schemas/projetoSchema'

const projetoRotas = express()

projetoRotas.get('/projeto', new ControladorProjeto().listar)
projetoRotas.get('/projeto/:usuario_id', new ControladorProjeto().listarPeloUserId)
projetoRotas.post('/projeto',
    tratamentoImagemIntermediario,
    validarRequisicao(projetoSchema),
    new ControladorProjeto().criar
)
projetoRotas.put('/projeto/:id',
    tratamentoImagemIntermediario,
    validarRequisicao(projetoSchema),
    new ControladorProjeto().editar
)
projetoRotas.delete('/projeto/:id', new ControladorProjeto().excluir)


export { projetoRotas }
