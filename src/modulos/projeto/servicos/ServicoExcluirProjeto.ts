import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'

class ServicoExcluirProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(id: String): Promise<void> {
        const projeto = await this.repositorioProjeto.excluir(id)
    }
}

export { ServicoExcluirProjeto }
