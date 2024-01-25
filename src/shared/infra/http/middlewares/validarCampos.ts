import { NextFunction } from "express";

export const validarRequisicao = function(joiSchema: any) {
    return async function(req: Request, res: Response, next: NextFunction) {
      try {
        await joiSchema.validateAsync(req.body);
        next();
      } catch (error) {
        return ''
      }
    };
};

