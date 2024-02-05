import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import seSwagger from '../../../util/seSwagger'

function validarRequisicao(schema: Schema): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            await schema.validateAsync(seSwagger(req.body), { stripUnknown: true })
            return next()

        } catch (error: any) {

            const errorMessage = error.details ? error.details[0].message : error.message
            return res.status(400).json({ error: errorMessage })
        }
    }
}
export default validarRequisicao
