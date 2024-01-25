export class AppError {
    public readonly mensagem: string
    public readonly status: number

    constructor(mensagem: string, status: number){
        this.mensagem = mensagem
        this.status = status
    }
}
