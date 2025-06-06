import { Router } from "express";
import { createUser, getAllUsers, getTime, getUserName, login, updateTime } from "../controllers/auth.controller"

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTime); //en la ruta despues de 2 puntos ES UN PARAMETRO, se le manda el tipo de dato
router.put('/updateTime', updateTime);
router.get('/users', getAllUsers);
router.get('/username/:username',getUserName);
router.post('/users', createUser);


export default router;