import prismaCliente from '../../../compartilhado/infra/prisma'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { AppError } from '../../../compartilhado/errors/AppError'
import { Storage } from '@google-cloud/storage';
import { processFileMiddleware } from '../../../compartilhado/infra/http/middlewares/salvarImagemMidleware';

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
        // await new Promise<void>((resolve, reject) => {
        //     blobStream.on('error', (err) => {
        //         reject(new AppError(err.message, 500));
        //     });

        //     blobStream.on('finish', () => {
        //         resolve();
        //     });

        //     blobStream.end(req.file.buffer);
        // });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // console.log(usuario_id, 'usuario_id')

        const usuarioExistente = await prismaCliente.usuario.findFirst({
            where: { id: usuario_id }
        })

        // console.log(usuarioExistente, 'usuarioExistente')

        if (!usuarioExistente) {
            throw new AppError("Usuário não existe na base de dados.", 404)
        }

        const linkExistente = await prismaCliente.projeto.findFirst({
            where: { link }
        })

        console.log(linkExistente?.link, 'linkExistente')

        if (linkExistente?.link) {
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

        // console.log(projeto, 'projeto criado agora')

        return projeto
    }

    public async editar(id: String, {
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

        const projetoExistente = await prismaCliente.projeto.findUnique({
            where: {
                id: String(id)
            }
        });

        if (!projetoExistente) {
            throw new AppError('Projeto não encontrado na base de dados.', 404);
        }

        // Excluir a imagem antiga do GCS
        const imagemAntiga = 'https://storage.googleapis.com/upload-file-test-1/download.jpeg';
        if (imagemAntiga) {
            const nomeArquivoAntigo = imagemAntiga.split('/').pop();
            if (nomeArquivoAntigo) {
                const blobAntigo = bucket.file(nomeArquivoAntigo);
                await blobAntigo.delete();
            }
        }

        // Fazer o upload da nova imagem
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        await new Promise<void>((resolve, reject) => {
            blobStream.on('error', (err) => {
                reject(new AppError(err.message, 500));
            });

            blobStream.on('finish', () => {
                resolve();
            });

            blobStream.end(req.file.buffer);
        });

        const projetoEditado = await prismaCliente.projeto.update({
            where: {
              id: String(id)
            },
            data: {
              titulo,
              tags,
              link,
              descricao,
              foto: 'publicUrl',
              usuario_id
            }
          });

        return projetoEditado
    }

    public async listar(): Promise<IProjeto[] | null> {
        const projetos = prismaCliente.projeto.findMany()

        return projetos

    }
}

export { RepositorioProjeto }
