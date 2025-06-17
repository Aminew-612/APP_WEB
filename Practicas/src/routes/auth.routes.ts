import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getTime, getUserName, login, updateTime, updateUser } from "../controllers/auth.controller"
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/order.controller";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller";

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTime); //en la ruta despues de 2 puntos ES UN PARAMETRO, se le manda el tipo de dato
router.put('/updateTime', updateTime);

//USUARIOS
router.get('/users', getAllUsers);
router.get('/username/:username',getUserName);
router.post('/users', createUser);
router.put('/updateUser/:userId', updateUser);
router.delete('/deleteUser/:userId', deleteUser);

//ORDENES
router.post('/order', createOrder);
router.put('/updateOrder/:id', updateOrder);
router.delete('/deleteOrder/:id', deleteOrder);
router.get('/getOrders', getOrders)

//PRODUCTOS
router.post('/product', createProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/getProducts', getAllProducts);


export default router;