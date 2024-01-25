export interface IUsuario {
    id: string
    nome: string
    sobrenome: string
    email: string
    senha: string
    foto?: string
    nacionalidade?: string

    // TODO Agurdando a implementação do modulo de produtos
    // projetos: IProjeto[]
}
