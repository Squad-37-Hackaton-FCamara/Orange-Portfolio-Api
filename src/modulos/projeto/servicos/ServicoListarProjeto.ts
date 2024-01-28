import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'

class ServicoListarProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(): Promise<IProjeto[] | null> {
        const projetos = await this.repositorioProjeto.listar()

        return projetos
    }
}

export { ServicoListarProjeto }
