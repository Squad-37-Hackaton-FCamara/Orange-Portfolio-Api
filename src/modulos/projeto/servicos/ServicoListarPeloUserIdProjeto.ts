import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'

class ServicoListarPeloUserIdProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(usuario_id: String): Promise<IProjeto[] | null> {
        const projetos = await this.repositorioProjeto.listarPeloUserId(usuario_id)

        return projetos
    }
}

export { ServicoListarPeloUserIdProjeto }
