import joi from 'joi'

// OBS: Ainda falta decidir as mensagens de erro.

export const usuarioSchema = joi.object({
  nome: joi.string().required().trim().messages({
    'any.required': 'Informar um nome',
    'string.empty': 'Informar um nome',
    'string.trim': '',
  }),
  sobrenome: joi.string().required().trim().messages({
    'any.required': 'Informar um sobrenome',
    'string.empty': 'Informar um sobrenome',
    'string.trim': '',
  }),
  email: joi.string().email().trim().required().messages({
    'string.email': 'Informe um e-mail válido',
    'any.required': 'Informar um e-mail',
    'string.empty': 'Informar um e-mail',
    'string.trim': '',
  }),

  senha: joi
  .string()
  .custom((value, helpers) => {
    // Verifica espaços em branco
    if (/\s/.test(value)) {
      return helpers.error('string.regex.base');
    }

    // Verifica se possui pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(value)) {
      return helpers.error('string.regex.uppercase');
    }

    // Verifica se possui pelo menos um caractere especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return helpers.error('string.regex.specialChar');
    }

    return value;
  }, '')
  .min(8)
  .required()
  .messages({
    'any.required': 'Informe uma senha',
    'string.min': 'A senha precisar ter no mínimo 8 dígitos.',
    'string.empty': 'Informe uma senha',
    'string.regex.base': 'A senha não pode ter espaços em branco.',
    'string.regex.uppercase':
      'A senha deve conter pelo menos uma letra maiúscula.',
    'string.regex.specialChar':
      'A senha deve conter pelo menos um caractere especial.',
  })
});
