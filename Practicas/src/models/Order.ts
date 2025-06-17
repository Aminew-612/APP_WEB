//se le hicieron adecuaciones al modelo "Ordenes"
import mongoose from "mongoose";
//se creó un objeto secundario que guardará una lista de productos que se ordenarán
interface IOrderProduct {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
};

//modelo principal
export interface IOrder extends Document {

    _id:mongoose.Types.ObjectId; 
    userId: string;
    total: number;
    subtotal: number;
    status: String;
    createDate: Date; 
    updateDate: Date; 
    products: IOrderProduct[]; //se va a usar ese objeto secundario dentro de este modelo principal
    
}

//se hará un esquema nuevo para el objeto secundario que acabamos de agregar, con todos sus atributos
const orderProductSchema = new mongoose.Schema<IOrderProduct>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    

}, {_id:false}); //esto ultimo para que no genere un id automaticamente


// esquema del modelo principal
const orderSchema = new mongoose.Schema<IOrder>({
    userId:{
        type:String,
        required: true,
        unique: true
    },
    total: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
        validate: [(array:string | any[]) => array.length > 0, 'Debe contener al menos un producto' ]
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    },
    status:{
        type: String,
        default: 'Pendiente',
        required: true
    },

});





export const Order=mongoose.model<IOrder>('Order', orderSchema, 'order');