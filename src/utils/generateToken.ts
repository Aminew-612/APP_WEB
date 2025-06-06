import jwt from 'jsonwebtoken';

// Constante corregida
const ACCESS_SECRET = 'secret12345utd';

// Función para generar el token
export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { userId },
        ACCESS_SECRET,
        {
            expiresIn: '15m'  // Tiempo de expiración correcto
        }
    );
};