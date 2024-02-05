import express from 'express'
import { ControladorProjeto } from '../../../../modulos/projeto/controladores/ControladorProjeto'
import { tratamentoImagemIntermediario } from '../intermediario/tratarImagem'
import validarRequisicao from '../intermediario/validarCampos'
import autenticado from '../intermediario/autenticacao'
import { projetoSchema } from '../schemas/projetoSchema'

const projetoRotas = express()

projetoRotas.get('/projeto', autenticado, new ControladorProjeto().listar)
projetoRotas.get('/projeto/:usuario_id', autenticado, new ControladorProjeto().listarPeloUserId)
projetoRotas.post('/projeto',
    autenticado,
    tratamentoImagemIntermediario,
    validarRequisicao(projetoSchema),
    new ControladorProjeto().criar
)
projetoRotas.put('/projeto/:id',
    autenticado,
    tratamentoImagemIntermediario,
    validarRequisicao(projetoSchema),
    new ControladorProjeto().editar
)
projetoRotas.delete('/projeto/:id', autenticado, new ControladorProjeto().excluir)


export { projetoRotas }
