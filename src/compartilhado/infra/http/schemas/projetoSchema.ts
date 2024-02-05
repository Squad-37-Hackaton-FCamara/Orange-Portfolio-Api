import joi from 'joi'

const espacoRemovido = 'Espaços em branco extras foram removidos.'

export const projetoSchema = joi.object({
  titulo: joi.string().required().max(20).trim().messages({
    'any.required': 'O campo título é obrigatório!',
    'string.empty': 'O campo título é obrigatório!',
    'string.trim': espacoRemovido,
    'string.max': 'A campo título precisar ter no máximo 20 caracteres.',
  }),
  tags: joi.array().items(joi.string().trim()).messages({
    'string.base': 'O campo tags deve ser um array de strings.',
    'string.trim': espacoRemovido,
  }),
  link: joi.string().trim().required().custom((value, helpers) => {
    // Verifica espaços em branco
    if (/\s/.test(value)) {
      return helpers.error('string.regex.base');
    }
    return value;
   })
  .messages({
    'any.required': 'O campo link é obrigatório!',
    'string.empty': 'O campo link é obrigatório!',
    'string.regex.base': 'O link não pode ter espaços em branco.',
    'string.trim': espacoRemovido,
  }),
  descricao: joi.string().empty('').max(250).messages({
    'string.max': 'A campo descricao precisar ter no máximo 250 caracteres.',
  }),
  usuario_id: joi.string().trim().required().messages({
    'any.required': 'O campo usuario_id é obrigatório!',
    'string.empty': 'O campo usuario_id é obrigatório!',
    'string.trim': espacoRemovido,
  }),
  autor: joi.string().required().max(20).trim().messages({
    'any.required': 'O campo autor é obrigatório!',
    'string.empty': 'O campo autor é obrigatório!',
    'string.trim': espacoRemovido,
    'string.max': 'A campo autor precisar ter no máximo 20 caracteres.',
  }),
})


