import { Request, Response, NextFunction, response } from "express";
import { AppError } from "../../../errors/AppError";

export const tratarErros = function(err: Error, req: Request, res: Response, next: NextFunction) {

    if(err instanceof AppError){
        return res.status(err.status).json({
            mensagem: err.mensagem
        })
    }

    return res.status(500).json({
        mensagem: 'Erro interno do servidor!'
    })
};
