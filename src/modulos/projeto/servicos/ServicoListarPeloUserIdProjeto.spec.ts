import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { AppError } from '../../../compartilhado/errors/AppError'
import { ServicoListarPeloUserIdProjeto } from './ServicoListarPeloUserIdProjeto'

class RepositorioUsuarioMock {
    private usuarios: any[] = [
        {
            id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            nome: 'Usuário Teste',
            email: 'usuario@teste.com'
        }
    ];

    async encontrarPorId(id: string): Promise<any | null> {
        return this.usuarios.find(usuario => usuario.id === id) || null;
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

    constructor(private repositorioUsuario: RepositorioUsuarioMock) {}

    criar(data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    editar(id: String, data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    listar(): Promise<IProjeto[] | null> {
        throw new Error('Method not implemented.')
    }
    async listarPeloUserId(id: String): Promise<IProjeto[] | null> {

        const usuario = await this.repositorioUsuario.encontrarPorId(String(id));
        if (!usuario) {
            throw new AppError('O usuário associado ao projeto não existe!', 404);
        }

        const projetos = this.projetos.filter(projeto => projeto.usuario_id === id);

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
        await expect(servicoListarPeloUserIdProjeto.executar('b300e524-04c4-4f6b-a3a6-5decd165c8e3')).resolves.toBeDefined();
    });

    it('não deve ser possível listar todos os projetos assosiados ao id se o id não existir', async function () {
        await expect(servicoListarPeloUserIdProjeto.executar('b300e524-04c4-4f6b-a3a6ffhdgdfv')).rejects.toBeInstanceOf(AppError);
    });
})
