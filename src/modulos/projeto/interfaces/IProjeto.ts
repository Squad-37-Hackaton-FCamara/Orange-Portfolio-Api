export interface IProjeto {
    id: string
    titulo: string
    tags: string[]
    link: string
    descricao: string | ''
    foto: string | Express.Multer.File | undefined
    usuario_id: string
}
