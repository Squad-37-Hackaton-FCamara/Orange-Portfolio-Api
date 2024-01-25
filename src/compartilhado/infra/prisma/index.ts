import { PrismaClient } from '@prisma/client'

// Usado para acessa e manipuilar o banco de dados
const prismaCliente = new PrismaClient()

export default prismaCliente
