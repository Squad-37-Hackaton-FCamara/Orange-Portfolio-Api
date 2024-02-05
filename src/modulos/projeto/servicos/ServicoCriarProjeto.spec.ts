import { ICriarProjeto } from '../interfaces/ICriarProjeto'
import { IRepositorioProjeto } from '../interfaces/IRepositorioProjeto'
import { IProjeto } from '../interfaces/IProjeto'
import { ServicoCriarProjeto } from './ServicoCriarProjeto'
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

    private projetos: IProjeto[] = []

    constructor(private repositorioUsuario: RepositorioUsuarioMock) {}

    public async criar(data: ICriarProjeto): Promise<IProjeto> {
        let projeto: IProjeto

         const usuario = await this.repositorioUsuario.encontrarPorId(data.usuario_id)
         if (!usuario) {
            throw new ErroPersonalizado('O usuário associado ao projeto não existe!', 400)
         }

        const linkExistente = this.projetos[0]
            ? this.projetos[0].link === data.link
            : false

        if (linkExistente) {
            throw new ErroPersonalizado('Esse link já está associado a um projeto!', 400)
        }

        projeto = {
            id: '1',
            titulo: data.titulo,
            tags: data.tags,
            link: data.link,
            descricao: data.descricao,
            foto: data.foto,
            usuario_id: data.usuario_id,
            autor: data.autor
        }

        this.projetos.push(projeto)

        return projeto
    }

    editar(id: String, data: ICriarProjeto): Promise<IProjeto> {
        throw new Error('Method not implemented.')
    }
    listar(): Promise<IProjeto[] | []> {
        throw new Error('Method not implemented.')
    }
    listarPeloUserId(id: String): Promise<IProjeto[] | []> {
        throw new Error('Method not implemented.')
    }
    excluir(id: String): Promise<void> {
        throw new Error('Method not implemented.')
    }
}

let repositorioProjetoMock: RepositorioProjetoMock
let servicoCriarProjeto: ServicoCriarProjeto

describe('ServicoCriarProjeto', () => {
    beforeEach(() => {
        repositorioProjetoMock = new RepositorioProjetoMock(new RepositorioUsuarioMock())
        servicoCriarProjeto = new ServicoCriarProjeto(repositorioProjetoMock)
    })

    it('deve criar um projeto', async function () {

        const dadosProjeto: ICriarProjeto = {
            titulo: 'Meu projeto Teste Unitário',
            tags: ['Front-End', 'API'],
            link: 'https://www.linkedin.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            autor: 'Usuário Teste'
        }

        const projetoCriado = await servicoCriarProjeto.executar(dadosProjeto)

        expect(projetoCriado).toBeDefined()
        expect(projetoCriado.id).toBeDefined()
        expect(projetoCriado.titulo).toBe(dadosProjeto.titulo)
        expect(projetoCriado.link).toBe(dadosProjeto.link)
    })

    it('não deve ser possível criar um novo projeto se o link já estiver assossiado a um projeto', async function () {

        await servicoCriarProjeto.executar({
            titulo: 'Meu projeto Teste Unitário',
            tags: ['Front-End', 'API'],
            link: 'https://www.linkedin.com/',
            descricao: 'Descrição do meu projeto teste',
            foto: 'https://storage.googleapis.com/upload-file-test-1/stripe-lata.png',
            usuario_id: 'b300e524-04c4-4f6b-a3a6-5decd165c8e3',
            autor: 'Usuário Teste'
        })

        expect(
            servicoCriarProjeto.executar({
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

    it('não deve ser possível criar um novo projeto se o usuario_id não existir', async function () {

        expect(
            servicoCriarProjeto.executar({
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
