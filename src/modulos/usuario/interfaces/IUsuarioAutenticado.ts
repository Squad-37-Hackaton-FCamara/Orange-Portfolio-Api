import { IUsuario } from "./IUsuario"

export interface IUsuarioAutenticado {
    usuario: IUsuario
    token: string
}
