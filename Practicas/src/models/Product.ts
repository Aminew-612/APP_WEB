import mongoose, { Document, Types} from "mongoose";


export interface IProduct extends Document {

    id:Types.ObjectId; 
    name:String;
    description:String;
    qty:Number; 
    status:boolean;
    price:Number;
    createDate: Date; //fecha de creacion
    deleteDate: Date; //fecha de eliminacion
};

const productSchema = new mongoose.Schema<IProduct>({
    name:{
        type:String,
        required: true,
        unique: true
    },
    
    description:{
        type: String,
        required: true,
        unique: true
    },
    qty:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
     price:{
        type: Number,
        required: true
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
export const Product=mongoose.model<IProduct>('Product', productSchema, 'product');