import {Router} from 'express';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from '../controller/user.js';
import {checkUser} from '../middlewares/checkUser.js';
import {validate, inputValidationRules} from '../middlewares/validator.js';

const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/:id', checkUser, getUserById);
userRouter.post('/', inputValidationRules(), validate, createUser);
userRouter.put('/:id', inputValidationRules(), validate, updateUser);
userRouter.delete('/:id', checkUser, deleteUserById);

export default userRouter;
