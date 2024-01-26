import { IAutenticacao } from '../interfaces/IAutenticacao'
import { IRepositorioAutenticacao } from '../interfaces/IRepositorioAutenticacao'
import { IUsuarioAutenticado } from '../interfaces/IUsuarioAutenticado'

class ServicoAutenticacao {
    constructor(private repositorioAutenticacao: IRepositorioAutenticacao) {}

    public async executar(data: IAutenticacao): Promise<IUsuarioAutenticado> {
        const usuarioAutenticado =
            await this.repositorioAutenticacao.autenticar(data)

        return usuarioAutenticado
    }
}

export { ServicoAutenticacao }
