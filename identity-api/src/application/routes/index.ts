import { Router } from 'express'
import AdminAuth from '../../core/middleware/AdminAuth'
import { changeUserRoleController } from '../use-cases/ChangeUserRole'
import { createUserController } from '../use-cases/CreateUser'
import { loginController } from '../use-cases/Login'

const router = Router()

router.post('/', (req, res) => createUserController.handle(req, res))
router.patch('/:id', AdminAuth, (req, res) => changeUserRoleController.handle(req, res))

router.post('/login', (req, res) => loginController.handle(req, res))

export default router
