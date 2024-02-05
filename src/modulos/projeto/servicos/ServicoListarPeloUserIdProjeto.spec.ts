import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ServicoListarPeloUserIdProjeto } from './ServicoListarPeloUserIdProjeto'
import { ErroPersonalizado } from '../../../compartilhado/erros/Erros'

class RepositorioUsuarioMock {
    private usuarios: any[] = [
        {
            id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            nome: 'Usuário Teste',
            email: 'usuario@teste.com'
        }
    ]

    async encontrarPorId(id: string): Promise<any | null> {
        return this.usuarios.find(usuario => usuario.id === id) || null
    }
}

class RepositorioProjetoMock implements IRepositorioProjeto {

    private projetos: IProjeto[] = [
        {
            id: '1',
            titulo: 'Meu projeto Teste Unitário',
            tags: ['Front-End', 'API'],
            link: 'https://www.linkedin.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            autor: 'Usuário Teste'
        },
        {
            id: '2',
            titulo: 'Meu projeto Teste Unitário 2',
            tags: ['Back-End', 'API'],
            link: 'https://www.google.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            autor: 'Usuário Teste'
        },
        {
            id: '3',
            titulo: 'Meu projeto Teste Unitário 3',
            tags: ['Front-End', 'API'],
            link: 'https://www.vafvv',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3sdbgfghgdhb',
            autor: 'Usuário Teste'
        },
    ]

    constructor(private repositorioUsuario: RepositorioUsuarioMock) {}

    criar(data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    editar(id: String, data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    listar(): Promise<IProjeto[] | []> {
        throw new Error('Method not implemented.')
    }
    async listarPeloUserId(id: String): Promise<IProjeto[] | []> {
        const tag = 'Fron';

        const usuario = await this.repositorioUsuario.encontrarPorId(String(id))

        if (!usuario) {
            throw new ErroPersonalizado('O usuário associado ao projeto não existe!', 400)
        }

        let projetos = this.projetos.filter(projeto => projeto.usuario_id === id);

        // Filtrar por tag, se a tag estiver presente
        if (tag) {
            projetos = projetos.filter(projeto => projeto.tags.includes(tag));
        }

        return projetos
    }
    excluir(id: String): Promise<void> {
        throw new Error('Method not implemented.')
    }
}

let repositorioProjetoMock: RepositorioProjetoMock
let servicoListarPeloUserIdProjeto: ServicoListarPeloUserIdProjeto

describe('ServicoListarPeloUserIdProjeto', () => {
    beforeEach(() => {
        repositorioProjetoMock = new RepositorioProjetoMock(new RepositorioUsuarioMock())
        servicoListarPeloUserIdProjeto = new ServicoListarPeloUserIdProjeto(repositorioProjetoMock)
    })

    it('deve ser possível listar todos os projetos assosiados ao id', async function () {
        const tag = 'Fron';
        await expect(servicoListarPeloUserIdProjeto.executar('b300e524-04c4-4f6b-a3a6-5decd165c8e3', tag)).resolves.toBeDefined()
    })

    it('não deve ser possível listar todos os projetos assosiados ao id se o id não existir', async function () {
        const tag = 'Fron';
        await expect(servicoListarPeloUserIdProjeto.executar('b300e524-04c4-4f6b-a3a6ffhdgdfv', tag)).rejects.toBeInstanceOf(ErroPersonalizado)
    })
})
