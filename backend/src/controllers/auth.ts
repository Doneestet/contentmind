import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { AppError } from '../middleware/errorHandler'

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret_here', {
    expiresIn: '7d',
  })
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new AppError('Email already exists', 400)
    }

    const user = await User.create({
      email,
      password,
      name,
    })

    const token = generateToken(user._id)

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401)
    }

    const token = generateToken(user._id)

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
}