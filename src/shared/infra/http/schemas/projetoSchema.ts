import joi from 'joi'

// OBS: Ainda falta decidir as mensagens de erro.

export const projetoSchema = joi.object({
  titulo: joi.string().required().trim().messages({
    'any.required': 'Informar um título para o projeto.',
    'string.empty': 'Informar um título para o projeto.',
    'string.trim': '',
  }),
  tags: joi.string().required().trim().messages({
    'string.empty': '',
    'string.trim': '',
  }),
  link: joi.string().email().trim().required().messages({
    'any.required': 'Informe o link do projeto.',
    'string.empty': 'Informe o link do projeto.',
    'string.trim': '',
  }),
  descricao: joi.string().email().trim().required().messages({
    'string.empty': '',
    'string.trim': '',
  }),
  foto: joi.string().email().trim().required().messages({
    'any.required': '',
    'string.empty': '',
    'string.trim': '',
  }),
  usuario_id: joi.number().integer().positive().required().messages({
    "any.required":'',
    "number.base": '',
    "number.positive":'' ,
  }),
});


