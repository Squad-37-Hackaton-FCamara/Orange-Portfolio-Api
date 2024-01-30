import joi from 'joi'

const campoObrigatorio = 'Preencher todos os campos!'
const espacoRemovido = 'Espaços em branco extras foram removidos.'

export const usuarioSchema = joi.object({
  nome: joi.string().required().trim().custom((value, helpers) => {
    // Verifica se contém apenas letras
    if (!/^[a-zA-Z]+$/.test(value)) {
      return helpers.error('string.invalidFormat')
    }
    return value;
  })
  .messages({
    'string.base': "o nome precisa ser um texto",
    'any.required': campoObrigatorio,
    'string.empty': campoObrigatorio,
    'string.trim': espacoRemovido,
    'string.invalidFormat': 'Insira um nome válido!'
  }),
  sobrenome: joi.string().required().trim().custom((value, helpers) => {
    // Verifica se contém apenas letras
    if (!/^[a-zA-Z]+$/.test(value)) {
      return helpers.error('string.invalidFormat')
    }
    return value;
  })
  .messages({
    'any.required': campoObrigatorio,
    'string.empty': campoObrigatorio,
    'string.trim': espacoRemovido,
    'string.invalidFormat': 'Insira um sobrenome válido!'
  }),
  email: joi.string().email().trim().required().messages({
    'string.email': 'Informe um e-mail válido',
    'any.required': campoObrigatorio,
    'string.empty': campoObrigatorio,
    'string.trim': espacoRemovido,
  }),
  senha: joi
  .string()
  .custom((value, helpers) => {
    // Verifica espaços em branco
    if (/\s/.test(value)) {
      return helpers.error('string.regex.base')
    }
    return value
   })
  .min(8)
  .max(10)
  .trim()
  .required()
  .messages({
    'any.required': campoObrigatorio,
    'string.min': 'A senha precisar ter no mínimo 8 dígitos.',
    'string.max': 'A senha precisar ter no máximo 10 dígitos.',
    'string.empty': campoObrigatorio,
    'string.regex.base': 'A senha não pode ter espaços em branco.',
    'string.trim': espacoRemovido,
  })
})
