import mongoose from "mongoose";


const connectDBMongo= async ():Promise<void> =>{
    const mongoUri="mongodb://localhost:27017/practicas"; //por si no se conecta agrega ?authSource=admin
                   //mongodb://<user>:<pass>@<servidor>:<puerto>/<db>

                   //CUANDO NO HAY USUARIO O CONTRASEÑA
                   //mongobd://<servidor>:<puerto>/<db>   
                   //mongodb://localhost:27017/proyecto  -->cuando no hay usuario o contraseña
    try{
        await mongoose.connect(mongoUri);
        console.log("Conexión a mongo");

    } catch (error) {
        console.log("Error conexion a mongo:", error);
    }
}

export default connectDBMongo;