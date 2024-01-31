import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ServicoExcluirProjeto } from './ServicoExcluirProjeto'
import { ErroPersonalizado } from '../../../compartilhado/erros/Erros'

class RepositorioProjetoMock implements IRepositorioProjeto {

    private projetos: IProjeto[] = [
        {
            id: '1',
            titulo: 'Meu projeto Teste Unitário',
            tags: ['Front-End', 'API'],
            link: 'https://www.linkedin.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3'
        }
    ]

    criar(data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    editar(id: String, data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    listar(): Promise<IProjeto[] | null> {
        throw new Error('Method not implemented.')
    }
    listarPeloUserId(id: String): Promise<IProjeto[] | null> {
        throw new Error('Method not implemented.')
    }
    async excluir(id: String): Promise<void> {
        const projetoExistente = this.projetos.find(projeto => projeto.id === id)

        if (!projetoExistente) {
            throw new ErroPersonalizado('O projeto não existe na base de dados!', 400)
        }
    }
}

let repositorioProjetoMock: RepositorioProjetoMock
let servicoExcluirProjeto: ServicoExcluirProjeto

describe('ServicoExcluirProjeto', () => {
    beforeEach(() => {
        repositorioProjetoMock = new RepositorioProjetoMock()
        servicoExcluirProjeto = new ServicoExcluirProjeto(repositorioProjetoMock)
    })

    it('deve ser possível excluir um projeto', async function () {
        await expect(servicoExcluirProjeto.executar('1')).resolves.toBeUndefined()
    })

    it('não deve ser possível excluir um projeto se o id não existir', async function () {
        await expect(servicoExcluirProjeto.executar('2')).rejects.toBeInstanceOf(ErroPersonalizado)
    })
})
