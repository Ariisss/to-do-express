import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// validates request body to match the type i n schema
export function validateRequest(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true 
    });

    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: error.details.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    next();
  };
}

// password pattern (chatgpt hehe)
const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const passwordMessage = 'Password must be at least 6 characters long, contain at least one uppercase letter and one number';

// email pattern (chatgpt hehe)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailMessage = 'Please enter a valid email address';

// schemas for diff routes
export const schemas = {
  auth: {
    register: Joi.object({
      email: Joi.string()
        .pattern(emailPattern)
        .required()
        .messages({
          'string.pattern.base': emailMessage
        }),
      password: Joi.string()
        .pattern(passwordPattern)
        .required()
        .messages({
          'string.pattern.base': passwordMessage
        })
    }),
    login: Joi.object({
      email: Joi.string()
        .pattern(emailPattern)
        .required()
        .messages({
          'string.pattern.base': emailMessage
        }),
      password: Joi.string().required()
    })
  },
  todo: {
    create: Joi.object({
      title: Joi.string().required().min(1).max(255),
      description: Joi.string().optional().allow('').max(1000)
    }),
    update: Joi.object({
      title: Joi.string().optional().min(1).max(255),
      description: Joi.string().optional().allow('').max(1000),
      is_completed: Joi.boolean().optional()
    })
  }
};
