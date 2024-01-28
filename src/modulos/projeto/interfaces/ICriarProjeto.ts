export interface ICriarProjeto {
    titulo: string
    tags: string[]
    link: string
    descricao: string
    foto: Express.Multer.File | undefined
    usuario_id: string
}
