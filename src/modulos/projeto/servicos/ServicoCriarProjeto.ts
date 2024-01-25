import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ICriarProjeto } from '../interfaces/ICriarProjeto'

class ServicoCriarProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(data: ICriarProjeto): Promise<IProjeto> {
        const projeto = await this.repositorioProjeto.criar(data)

        return projeto
    }
}

export { ServicoCriarProjeto }
