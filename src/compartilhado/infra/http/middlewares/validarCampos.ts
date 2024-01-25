import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/AppError";
import Joi, { Schema, ValidationResult } from "joi";

export const validarRequisicao = (joiSchema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const opcoesValidacao = {
        abortEarly: true,
        allowUnknown: true
      };

      const result: ValidationResult = await joiSchema.validateAsync(req.body, opcoesValidacao);

      if (result.error) {
        throw new AppError(result.error.message, 400);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        next(error);
      } else {
        throw new AppError("Erro interno do servidor!", 500);
      }
    }
  };
};

