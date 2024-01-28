import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ServicoListarProjeto } from './ServicoListarProjeto'

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
        },
        {
            id: '2',
            titulo: 'Meu projeto Teste Unitário 2',
            tags: ['Back-End', 'API'],
            link: 'https://www.google.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3'
        },
        {
            id: '3',
            titulo: 'Meu projeto Teste Unitário 3',
            tags: ['Front-End', 'API'],
            link: 'https://www.vafvv',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3sdbgfghgdhb'
        },
    ]

    criar(data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    editar(id: String, data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    listar(): Promise<IProjeto[] | null> {
        return Promise.resolve(this.projetos);
    }
    async listarPeloUserId(id: String): Promise<IProjeto[] | null> {
        throw new Error('Method not implemented.')
    }
    excluir(id: String): Promise<void> {
        throw new Error('Method not implemented.')
    }
}

let repositorioProjetoMock: RepositorioProjetoMock
let servicoListarProjeto: ServicoListarProjeto

describe('ServicoListarPeloUserIdProjeto', () => {
    beforeEach(() => {
        repositorioProjetoMock = new RepositorioProjetoMock()
        servicoListarProjeto = new ServicoListarProjeto(repositorioProjetoMock)
    })

    it('deve ser possível listar todos os projetos assosiados ao id', async function () {
        await expect(servicoListarProjeto.executar()).resolves.toBeDefined();
    });

})
