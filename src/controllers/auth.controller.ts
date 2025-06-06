import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import NodeCache from "node-cache";
import dayjs from "dayjs";
import { json } from "stream/consumers";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
// Crear instancia de caché (si no la tienes en otro archivo)
const cache = new NodeCache();


export const login = (req: Request, res: Response) => {
    let name: string = "yo";

    const { username, password } = req.body;

    // Credenciales incorrectas
    if (username !== 'Admin' || password !== '123456789') {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const userId = 'abc123';
    const accessToken = generateAccessToken(userId);

    // Guardar token en caché por 15 minutos
    cache.set(userId, accessToken, 60 * 15);

    return res.json({
        message: 'Login exitoso',
        accessToken
    });
};

export const getTime = (req:Request, res:Response) => {
    const {userId} = req.params
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404)
            .json({ message: "Token no encontrado"})
    }
    //cambiar formato de fecha y hora
    //primero tenemos que crear variables
    const now=Date.now();
    const timeToLifeSeconds=Math.floor((ttl-now)/1000);
    const expTime=dayjs(ttl).format('HH:mm:ss')

    return res.json({
        timeToLifeSeconds,
        expTime
    })
};

//metodo o controlador que nos va a ayudar a actualizar el tiempo del token

export const updateTime = (req:Request, res:Response) => {
    const {userId} = req.body;
    const ttl = cache.getTtl(userId); //buscar token

    if(!ttl) {
        return res.status(404).json({message: 'Token no encontrado o expirado'}); //si existe lo actualiza
    }

    const nuevaTTLsegundos = 60 * 15;
    cache.ttl(userId, nuevaTTLsegundos); //Metodo para actualizar el tiempo de vida del token

    res.json('Actualizado con éxito');

};

export const getAllUsers=async (req:Request, res: Response) => {
    const userList=await User.find()//BUSCAR Y TRAER TODOS LOS REGISTROS 
    //const userList=await User.find({status:true})//BUSCAR Y TRAER TODOS LOS REGISTROS activos


    return res.json({ userList });
};

// para buscar por nombre de usuario

export const getUserName=async (req:Request, res: Response) => {
    try{
        const { username } = req.params;
        const user = await User.findOne({ username});

        if (!user){
            return res.status(404).json({ message:'Usuario no encontrado'});
        }
        res.json(user);
    }catch (error){
        res.status(500).json({ message:'Error al buscar el usuario', error});
    };

};

export const createUser = async (req:Request, res:Response) => {
    try {
        const { username, password, email, role } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            email,
            status: true
        });

        const user = await newUser.save();
        return res.json({ user });

    } catch (error) {
        console.log("Error ocurrido en createUser: ", error);
        return res.status(426).json({ error });
    }
};