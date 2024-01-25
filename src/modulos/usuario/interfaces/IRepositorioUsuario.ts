import { ICriarUsuario } from './ICriarUsuario'
import { IUsuario } from './IUsuario'

export interface IRepositorioUsuario {
    criar(data: ICriarUsuario): Promise<IUsuario>
}
