import express from 'express'
import { body } from 'express-validator'
import { register, login } from '../controllers/auth'
import { validateRequest } from '../middleware/validateRequest'

const router = express.Router()

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  validateRequest,
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
)

export default router