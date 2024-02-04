import { ICriarUsuario } from '../interfaces/ICriarUsuario'
import { IRepositorioUsuario } from '../interfaces/IRepositorioUsuario'
import { IUsuario } from '../interfaces/IUsuario'

class ServicoVerificarEmail {
    constructor(private repositorioUsuario: IRepositorioUsuario) {}

    public async executar(email: string): Promise<boolean> {
        const usuario = await this.repositorioUsuario.seUsusarioExiste(email)

        return usuario
    }
}

export { ServicoVerificarEmail }
