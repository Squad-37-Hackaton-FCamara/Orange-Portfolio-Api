import { IProjeto } from './IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'

export interface IRepositorioProjeto {
    criar(data: ICriarProjeto): Promise<IProjeto>
    editar(id: String, data: ICriarProjeto): Promise<IProjeto>
    listar(): Promise<IProjeto[] | null>
}
