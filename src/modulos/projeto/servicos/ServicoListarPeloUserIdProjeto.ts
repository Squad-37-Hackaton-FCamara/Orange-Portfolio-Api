import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'

class ServicoListarPeloUserIdProjeto {
    constructor(private repositorioProjeto: IRepositorioProjeto) {}

    public async executar(usuario_id: String, tag: string | undefined): Promise<IProjeto[] | []> {
        let projetos = await this.repositorioProjeto.listarPeloUserId(usuario_id)

        if (tag) {
            projetos = projetos?.filter(projeto =>
                projeto.tags.some(projetoTag => projetoTag.toLowerCase().includes(tag.toLowerCase()))
            );
        }

        return projetos
    }
}

export { ServicoListarPeloUserIdProjeto }
