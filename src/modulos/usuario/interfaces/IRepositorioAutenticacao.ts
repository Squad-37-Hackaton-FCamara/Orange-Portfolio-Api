import { IAutenticacao } from './IAutenticacao'
import { IUsuarioAutenticado } from './IUsuarioAutenticado'

export interface IRepositorioAutenticacao {
    autenticar(data: IAutenticacao): Promise<IUsuarioAutenticado>
}
