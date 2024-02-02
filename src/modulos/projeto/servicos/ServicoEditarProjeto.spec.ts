import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ServicoEditarProjeto } from './ServicoEditarProjeto'
import { ErroPersonalizado } from '../../../compartilhado/erros/Erros'

class RepositorioUsuarioMock {
    private usuarios: any[] = [
        {
            id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            nome: 'Usuário Teste',
            email: 'usuario@teste.com'
        },
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
        }
    ]

    constructor(private repositorioUsuario: RepositorioUsuarioMock) {}

    criar(data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }

    async editar(id: string, data: ICriarProjeto): Promise<IProjeto> {
        const projetoExistente = this.projetos.find(projeto => projeto.id === id)

        if (!projetoExistente) {
            throw new ErroPersonalizado('O projeto não existe na base de dados!', 400)
        }

        const usuario = await this.repositorioUsuario.encontrarPorId(data.usuario_id)
        if (!usuario) {
            throw new ErroPersonalizado('O usuário associado ao projeto não existe!', 400)
        }

        const linkJaAssociado = this.projetos.some(projeto => projeto.link === data.link && projeto.id !== id)

        if (linkJaAssociado) {
            throw new ErroPersonalizado('Esse link já está associado a outro projeto!', 400)
        }

        projetoExistente.titulo = data.titulo
        projetoExistente.tags = data.tags
        projetoExistente.link = data.link
        projetoExistente.descricao = data.descricao
        projetoExistente.foto = data.foto
        projetoExistente.usuario_id = data.usuario_id
        projetoExistente.autor = data.autor

        return projetoExistente
    }
    listar(): Promise<IProjeto[] | null> {
        throw new Error('Method not implemented.')
    }
    listarPeloUserId(id: String): Promise<IProjeto[] | null> {
        throw new Error('Method not implemented.')
    }
    excluir(id: String): Promise<void> {
        throw new Error('Method not implemented.')
    }
}

let repositorioProjetoMock: RepositorioProjetoMock
let servicoEditarProjeto: ServicoEditarProjeto

describe('ServicoEditarProjeto', () => {
    beforeEach(() => {
        repositorioProjetoMock = new RepositorioProjetoMock(new RepositorioUsuarioMock())
        servicoEditarProjeto = new ServicoEditarProjeto(repositorioProjetoMock)
    })

    it('deve editar um projeto', async function () {

        const dadosProjeto: ICriarProjeto = {
            titulo: 'Meu projeto Teste Unitário',
            tags: ['Front-End', 'API'],
            link: 'https://www.linkedin.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            autor: 'Usuário Teste'
        }

        const projetoEditado = await servicoEditarProjeto.executar('1', dadosProjeto)

        // Certifique-se de que o usuário foi criado corretamente
        expect(projetoEditado).toBeDefined()
        expect(projetoEditado.id).toBeDefined()
        expect(projetoEditado.titulo).toBe(dadosProjeto.titulo)
        expect(projetoEditado.link).toBe(dadosProjeto.link)
    })

    it('não deve ser possível editar um novo projeto se o id não existir', async function () {

        expect(
            servicoEditarProjeto.executar('3', {
                titulo: 'Meu projeto Teste Unitário',
                tags: ['Front-End', 'API'],
                link: 'https://www.linkedin.com/',
                descricao: 'Descrição do meu projeto teste',
                foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
                usuario_id: 'b300e524-04c4-4f6b-a3a6-5deckvkf84854v',
                autor: 'Usuário Teste'
            })
        ).rejects.toBeInstanceOf(ErroPersonalizado)
    })

    it('não deve ser possível editar um novo projeto se o link já estiver associado a outro projeto', async function () {

    await expect(
        servicoEditarProjeto.executar('2', {
            titulo: 'Meu projeto Teste Unitário',
            tags: ['Front-End', 'API'],
            link: 'https://www.linkedin.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            autor: 'Usuário Teste'
        })
    ).rejects.toBeInstanceOf(ErroPersonalizado)
})

    it('não deve ser possível editar um novo projeto se o usuario_id não existir', async function () {

        expect(
            servicoEditarProjeto.executar('1', {
                titulo: 'Meu projeto Teste Unitário',
                tags: ['Front-End', 'API'],
                link: 'https://www.linkedin.com/',
                descricao: 'Descrição do meu projeto teste',
                foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
                usuario_id: 'b300e524-04c4-4f6b-a3a6-5deckvkf84854v',
                autor: 'Usuário Teste'
            })
        ).rejects.toBeInstanceOf(ErroPersonalizado)
    })
})
