import { ICriarUsuario } from '../interfaces/ICriarUsuario'
import { IRepositorioUsuario } from '../interfaces/IRepositorioUsuario'
import { IUsuario } from '../interfaces/IUsuario'
import { ServicoCriarUsuario } from './ServicoCriarUsuario'

import { AppError } from '../../../compartilhado/errors/AppError'

// Mock para o repositório de usuário
class RepositorioUsuarioMock implements IRepositorioUsuario {
    private usuarios: IUsuario[] = []
    public async criar(data: ICriarUsuario): Promise<IUsuario> {
        let usuario: IUsuario

        let usuarioExistente = this.usuarios[0]
            ? this.usuarios[0].email === data.email
            : false

        if (usuarioExistente) {
            throw new AppError('ususario já cadastrado!', 401)
        }

        usuario = {
            id: '1',
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: data.senha
        }

        this.usuarios.push(usuario)

        // Retorna um usuário fictício para fins de teste
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

        // Certifique-se de que o usuário foi criado corretamente
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
        ).rejects.toBeInstanceOf(AppError)
    })
})