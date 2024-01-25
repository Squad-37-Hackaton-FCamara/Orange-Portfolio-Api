import express from 'express'

const projetoRotas = express()

projetoRotas.get('/projeto')
projetoRotas.get('/projeto/:userId')
projetoRotas.post('/projeto')
projetoRotas.put('/projeto')
projetoRotas.delete('/projeto')


export { projetoRotas }
