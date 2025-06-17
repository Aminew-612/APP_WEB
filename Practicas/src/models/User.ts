//LOS MODELSO VAN CON MAYUSCULA LA PRIMERA LETRA PARA DIFERENCIAR QUE SON MODELOS

import mongoose, { Document, Types} from "mongoose";

//interfaz o modelo, debo espicificarle el tipo de dato que estamos recibiendo
//creamos una interfaz que nos va  adecir las propiedades de nuestro modelo
//Propiedades: ID, username
export interface IUser extends Document {

    id:Types.ObjectId; //tipo de objeto que usa pasa sus id
    username:String;
    password:String;
    role:String; //despues lo cambiamos a objeto
    email:String;
    status:boolean;
    createDate: Date; //fecha de creacion
    deleteDate: Date; //fecha de eliminacion
    //no eliminamos de la base de datos, solo deshabilitamos
    //estos datos los piden en cada modelo que utilicemos
}
//generar un esquema
//el tipo de estema que va  agenerae es de tipo IUser
const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required: true,
        unique: true
    },
    //en mi base de datos el nombre de usuario es de tipo string,requerido y unico 
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date
    }

});


//crendo el modelo con la base de datos, el modelo se llama User, este es el esquema, y despues el nombre de la colección
export const User=mongoose.model<IUser>('User', userSchema, 'user');