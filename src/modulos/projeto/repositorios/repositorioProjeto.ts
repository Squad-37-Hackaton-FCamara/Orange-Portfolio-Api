import prismaCliente from '../../../compartilhado/infra/prisma'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { Storage } from '@google-cloud/storage'
import { ErroPersonalizado } from 'src/compartilhado/erros/Erros'

const storage = new Storage({ keyFilename: 'google-cloud-key.json' })
const bucket = storage.bucket('upload-file-test-1')

class RepositorioProjeto implements IRepositorioProjeto {
    public async criar({
        titulo,
        tags,
        link,
        descricao,
        foto,
        usuario_id
    }: ICriarProjeto): Promise<IProjeto> {

        let publicUrl

        if (foto && typeof foto === 'object') {

            const uniqueFileName = `${usuario_id}_${Date.now()}_${foto?.originalname}`
            const blob = bucket.file(uniqueFileName)

            const blobStream = blob.createWriteStream({
                resumable: false,
            })

            // Aguardar o término do upload
            await new Promise<void>((resolve, reject) => {
                blobStream.on('error', (err) => {
                    reject(new ErroPersonalizado(err.message, 400))
                })

                blobStream.on('finish', () => {
                    resolve()
                })

                blobStream.end(foto?.buffer)
            })

            publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        }

        const usuarioExistente = await prismaCliente.usuario.findUnique({
            where: { id: usuario_id }
        })

        if (!usuarioExistente) {
            throw new ErroPersonalizado('Usuário não existe na base de dados.', 400)
        }

        const linkExistente = await prismaCliente.projeto.findUnique({
            where: { link }
        })

        if (linkExistente?.link) {
            throw new ErroPersonalizado('Já existe um projeto com esse link na base de dados.', 400)
        }

        const projeto = prismaCliente.projeto.create({
            data: {
                titulo,
                tags,
                link,
                descricao,
                foto: publicUrl as string,
                usuario_id
            }
        })

        return projeto
    }

    public async editar(id: String, {
        titulo,
        tags,
        link,
        descricao,
        foto,
        usuario_id
    }: ICriarProjeto): Promise<IProjeto> {

        const projetoExistente = await prismaCliente.projeto.findUnique({
            where: {
                id: String(id)
            }
        })

        if (!projetoExistente) {
            throw new ErroPersonalizado('Projeto não encontrado na base de dados.', 400)
        }

        // Excluir a imagem antiga do GCS
        const imagemAntiga = projetoExistente.foto
        if (imagemAntiga) {
            const nomeArquivoAntigo = imagemAntiga.split('/').pop()
            if (nomeArquivoAntigo) {
                const blobAntigo = bucket.file(nomeArquivoAntigo)
                await blobAntigo.delete()
            }
        }

        let publicUrl

        if (foto && typeof foto === 'object') {

            // Fazer o upload da nova imagem
            const uniqueFileName = `${usuario_id}_${Date.now()}_${foto?.originalname}`
            const blob = bucket.file(uniqueFileName)
            const blobStream = blob.createWriteStream({
                resumable: false
            })

            await new Promise<void>((resolve, reject) => {
                blobStream.on('error', (err) => {
                    reject(new ErroPersonalizado(err.message, 400))
                })

                blobStream.on('finish', () => {
                    resolve()
                })

                blobStream.end(foto?.buffer)
            })

            publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        }

        const projetoEditado = await prismaCliente.projeto.update({
            where: {
              id: String(id)
            },
            data: {
              titulo,
              tags,
              link,
              descricao,
              foto: publicUrl,
              usuario_id
            }
          })

        return projetoEditado
    }

    public async listar(): Promise<IProjeto[] | null> {
        const projetos = prismaCliente.projeto.findMany()

        return projetos
    }

    public async listarPeloUserId(usuario_id: String): Promise<IProjeto[] | null> {

        const projetoUsuarioLogado = await prismaCliente.projeto.findMany({
            where: {
                usuario_id: String(usuario_id)
            }
        })

        return projetoUsuarioLogado

    }

    public async excluir(id: String): Promise<void> {

        const projetoExistente = await prismaCliente.projeto.findUnique({
            where: {
                id: String(id)
            }
        })

        if (!projetoExistente) {
            throw new ErroPersonalizado('O projeto informado não existe no banco de dados.', 400)
        }

        const imagemProjeto = projetoExistente.foto
        if (imagemProjeto) {
            const nomeArquivo = imagemProjeto.split('/').pop()
            if (nomeArquivo) {
                const blobAntigo = bucket.file(nomeArquivo)
                await blobAntigo.delete()
            }
        }

        await prismaCliente.projeto.delete({
            where: {
              id: String(id)
            }
        })
    }
}

export { RepositorioProjeto }
