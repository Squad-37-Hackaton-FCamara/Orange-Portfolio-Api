import multer, { Multer } from 'multer'

const maxSize = 2 * 1024 * 1024

const tratamentoImagem = (
    multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: maxSize }
    }) as Multer
).single('foto')

const tratamentoImagemIntermediario = tratamentoImagem

export { tratamentoImagemIntermediario }
