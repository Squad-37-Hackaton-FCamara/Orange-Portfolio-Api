import { ErroPersonalizado } from '../../../compartilhado/erros/Erros'
import { ICriarUsuario } from '../interfaces/ICriarUsuario'
import { IRepositorioUsuario } from '../interfaces/IRepositorioUsuario'
import { IUsuario } from '../interfaces/IUsuario'
import { ServicoCriarUsuario } from './ServicoCriarUsuario'

class RepositorioUsuarioMock implements IRepositorioUsuario {
    seUsusarioExiste(email: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    private usuarios: IUsuario[] = []

    public async criar(data: ICriarUsuario): Promise<IUsuario> {
        let usuario: IUsuario

        let usuarioExistente = this.usuarios[0]
            ? this.usuarios[0].email === data.email
            : false

        if (usuarioExistente) {
            throw new ErroPersonalizado('Ususario já cadastrado!', 400)
        }

        usuario = {
            id: '1',
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: data.senha
        }

        this.usuarios.push(usuario)

        return usuario
    }
}

let repositorioUsuarioMock: RepositorioUsuarioMock
let servicoCriarUsuario: ServicoCriarUsuario

describe('ServicoCriarUsuario', () => {
    beforeEach(() => {
        repositorioUsuarioMock = new RepositorioUsuarioMock()
        servicoCriarUsuario = new ServicoCriarUsuario(repositorioUsuarioMock)
    })
    it('deve criar um usuário', async function () {
        const dadosUsuario: ICriarUsuario = {
            nome: 'Usuário',
            sobrenome: 'Teste Jest',
            email: 'usuario@teste.com',
            senha: '123456'
        }

        const usuarioCriado = await servicoCriarUsuario.executar(dadosUsuario)

        expect(usuarioCriado).toBeDefined()
        expect(usuarioCriado.id).toBeDefined()
        expect(usuarioCriado.nome).toBe(dadosUsuario.nome)
        expect(usuarioCriado.email).toBe(dadosUsuario.email)
    })

    it('não deve ser possível criar um novo usuário se o endereço de e-mail já estiver em uso', async function () {
        await servicoCriarUsuario.executar({
            nome: 'Usuário',
            sobrenome: 'Teste Jest',
            email: 'usuario@teste.com',
            senha: '123456'
        })

        expect(
            servicoCriarUsuario.executar({
                nome: 'Usuário',
                sobrenome: 'Teste Jest 2',
                email: 'usuario@teste.com',
                senha: '654321'
            })
        ).rejects.toBeInstanceOf(ErroPersonalizado)
    })
})
