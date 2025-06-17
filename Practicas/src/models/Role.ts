
import mongoose, { Document, Types} from "mongoose";


//interfaz o modelo, debo espicificarle el tipo de dato que estamos recibiendo
//creamos una interfaz que nos va  adecir las propiedades de nuestro modelo
export interface IRole extends Document {

    id:Types.ObjectId; //tipo de objeto que usa pasa sus id
    name: string;
    type: string;
    status: boolean;
}
//generar un esquema

const roleSchema = new mongoose.Schema<IRole>({
    name:{
        type:String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }

});


//crendo el modelo con la base de datos, el modelo se llama User, este es el esquema, y despues el nombre de la colección
export const Role=mongoose.model<IRole>('Role', roleSchema, 'role');