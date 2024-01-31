import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDcoumentacao from '../../../../swagger.json'
import  { projetoRotas }  from './rotas/projetoRotas'
import  { usuarioRotas }  from './rotas/usuarioRotas'

const porta = process.env.PORT || 8080
const url = `http://localhost:${porta}`
const app = express()

app.use(express.json(), cors())
app.use('/documentacao', swaggerUi.serve, swaggerUi.setup(swaggerDcoumentacao))

app.use(projetoRotas, usuarioRotas)

app.listen(porta, function () {
    console.log(`Servidor rodando em ${url}!🚀`)
})
