import { ICriarUsuario } from '../interfaces/ICriarUsuario'
import { IRepositorioUsuario } from '../interfaces/IRepositorioUsuario'
import { IUsuario } from '../interfaces/IUsuario'

class ServicoCriarUsuario {
    constructor(private repositorioUsuario: IRepositorioUsuario) {}

    public async executar(data: ICriarUsuario): Promise<IUsuario> {
        const usuario = await this.repositorioUsuario.criar(data)

        return usuario
    }
}

export { ServicoCriarUsuario }
