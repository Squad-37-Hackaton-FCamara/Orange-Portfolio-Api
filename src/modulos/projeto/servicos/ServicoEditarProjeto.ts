import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'

class ServicoEditarProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(id: String, data: ICriarProjeto): Promise<IProjeto> {
        const projeto = await this.repositorioProjeto.editar(id, data)

        return projeto
    }
}

export { ServicoEditarProjeto }
