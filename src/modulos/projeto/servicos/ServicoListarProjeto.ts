import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'

class ServicoListarProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(tag: string | undefined): Promise<IProjeto[] | []> {
        let projetos = await this.repositorioProjeto.listar()

        // Aplicar filtro se a tag estiver presente
        if (tag) {
            projetos = projetos?.filter(projeto =>
                projeto.tags.some(projetoTag => projetoTag.toLowerCase().includes(tag.toLowerCase()))
            );
        }

        return projetos
    }
}

export { ServicoListarProjeto }
