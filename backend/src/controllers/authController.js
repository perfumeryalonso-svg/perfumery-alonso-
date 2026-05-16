import { Admin } from '../models/index.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../config/constants.js';

export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.VALIDATION_ERROR
      });
    }

    const existingAdmin = await Admin.getByEmail(email);
    if (existingAdmin) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGES.DUPLICATE_EMAIL
      });
    }

    const hashedPassword = await hashPassword(password);

    const result = await Admin.create({
      email,
      password: hashedPassword
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.CREATED,
      data: { id: result.insertId }
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.VALIDATION_ERROR
      });
    }

    const admin = await Admin.getByEmail(email);
    if (!admin) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS
      });
    }

    const isPasswordValid = await comparePasswords(password, admin.password);
    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS
      });
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.FETCHED,
      data: {
        token,
        admin: {
          id: admin.id,
          email: admin.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
