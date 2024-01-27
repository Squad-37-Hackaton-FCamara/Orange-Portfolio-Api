import prismaCliente from '../../../compartilhado/infra/prisma'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { AppError } from '../../../compartilhado/errors/AppError'
import { Storage } from '@google-cloud/storage';
import { processFileMiddleware } from '../../../compartilhado/infra/http/middlewares/salvarImagemMidleware';
import { PrismaClient } from '@prisma/client'

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('upload-file-test-1');

class RepositorioProjeto implements IRepositorioProjeto {
    public async criar({
        titulo,
        tags,
        link,
        descricao,
        usuario_id,
        req,
        res
    }: ICriarProjeto): Promise<IProjeto> {

        await processFileMiddleware(req, res);

        if (!req.file) {
            throw new AppError('Por favor, selecione uma imagem!', 404);
        }

        const blob = bucket.file(req.file.originalname);

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        // Aguardar o término do upload
        await new Promise<void>((resolve, reject) => {
            blobStream.on('error', (err) => {
                reject(new AppError(err.message, 500));
            });

            blobStream.on('finish', () => {
                resolve();
            });

            blobStream.end(req.file.buffer);
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        const usuarioExistente = await prismaCliente.usuario.findFirst({
            where: { id: usuario_id }
        })

        if (!usuarioExistente) {
            throw new AppError("Usuário não existe na base de dados.", 404)
        }

        const linkExistente = await prismaCliente.projeto.findFirst({
            where: { link }
        })

        if (linkExistente) {
            throw new AppError("Já existe um projeto com esse link na base de dados.", 409)
        }

        const projeto = prismaCliente.projeto.create({
            data: {
                titulo,
                tags,
                link,
                descricao,
                foto: publicUrl,
                usuario_id
            }
        })

        return projeto
    } 

    public async listar(): Promise<IProjeto[] | null> {
        const projetos = prismaCliente.projeto.findMany()

        return projetos
       
    }
}

export { RepositorioProjeto }
