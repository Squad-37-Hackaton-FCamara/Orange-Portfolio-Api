import { IProjeto } from "@modulos/projeto/interfaces/IProjeto"

export interface IUsuario {
    id: string
    nome: string
    sobrenome: string
    email: string
    senha: string
    projetos?: IProjeto[]
}
