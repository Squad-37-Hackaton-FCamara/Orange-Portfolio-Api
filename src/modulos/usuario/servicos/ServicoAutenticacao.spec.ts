import { error } from "console";
import { IAutenticacao } from "../interfaces/IAutenticacao";
import { IRepositorioAutenticacao } from "../interfaces/IRepositorioAutenticacao";
import { IUsuario } from "../interfaces/IUsuario";
import { IUsuarioAutenticado } from "../interfaces/IUsuarioAutenticado";
import { ServicoAutenticacao } from "./ServicoAutenticacao";
import { ErroPersonalizado } from "src/compartilhado/erros/Erros";

class RepositorioAutenticacaoMock implements IRepositorioAutenticacao{
    private usuarios: IUsuario[] = [
        {
            id: "2",
            nome: "usuario",
            sobrenome: "teste 2",
            email: "email@teste.com",
            senha: "1234567"
        }
    ]


    public async autenticar(data: IAutenticacao): Promise<IUsuarioAutenticado> {
       let usuarioExistente = this.usuarios[0] ? this.usuarios[0].email===data.email: false

       if (!usuarioExistente) {
            throw new ErroPersonalizado('E-mail ou senha incorretos!', 400)

        }

        let senhaVerificada = this.usuarios[0] ? this.usuarios[0].senha===data.senha: false

        if (!senhaVerificada) {
            throw new ErroPersonalizado('E-mail ou senha incorretos!', 400)

        }

        return {
            usuario: this.usuarios[0],
            token: "teste"
        }
    }
}

let repositorioAutenticacaoMock: RepositorioAutenticacaoMock
let servicoAutenticacao: ServicoAutenticacao

describe("ServicoAutenticacao", ()=>{
    repositorioAutenticacaoMock = new RepositorioAutenticacaoMock()
    servicoAutenticacao = new ServicoAutenticacao(repositorioAutenticacaoMock)

    it("deve autenticar usuario com sucesso",async ()=> {


        const dadosAutenticacao: IAutenticacao = { email: "email@teste.com",
        senha: "1234567"}

        const usuarioAutenticado = await servicoAutenticacao.executar(dadosAutenticacao)

        expect(usuarioAutenticado).toHaveProperty("token")
    })

    it ("não deve autenticar caso o email esteja errado", async ()=>{

        const dadosAutenticacao: IAutenticacao = { email: "emailErrado@teste.com",
        senha: "1234567"}


        expect(servicoAutenticacao.executar(dadosAutenticacao)).rejects.toBeInstanceOf(ErroPersonalizado)
    })

    it ("não deve autenticar caso a senha esteja errada", async ()=>{

        const dadosAutenticacao: IAutenticacao = { email: "email@teste.com",
        senha: "1234"}


        expect(servicoAutenticacao.executar(dadosAutenticacao)).rejects.toBeInstanceOf(ErroPersonalizado)
    })
})
