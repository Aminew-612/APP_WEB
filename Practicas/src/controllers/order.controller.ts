import { Request, Response } from "express"
import {Order} from '../models/Order'

export const createOrder = async (req:Request, res:Response) => {
    try {
        const payload=req.body; //agregamos objeto body
        const newOrder=new Order(); //objeto de la base de datos

        Object.assign(newOrder, payload);

        newOrder.products //Tarea: generar total y subtotal antes de guardar

        //calcular subtotal
        const subtotal = newOrder.products.reduce((acc, prod) => {
            return acc + (prod.quantity * prod.price);
        }, 0);

        const iva = 0.16;
        const total = parseFloat((subtotal * (1 + iva)).toFixed(2));

        newOrder.subtotal = subtotal;
        newOrder.total = total;

        await newOrder.save(); //guardar

        return res.status(201).json({message: "Orden creada exitosamente", order: newOrder});
    } catch (error) {
        return res.status(500).json({message: "Error al crear la orden", error});
    }
};


// ACTUALIZAR status
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: "pagado" },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({
            message: "Orden actualizada a pagado",
            order: updatedOrder
        });
    } catch (error) {
        console.error("Error en updateOrder:", error);
        return res.status(500).json({ message: "Error al actualizar la orden", error });
    }
};


//DELETE (status: cancelado)
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const canceledOrder = await Order.findByIdAndUpdate(
            id,
            { status: "cancelado" },
            { new: true }
        );

        if (!canceledOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({
            message: "Orden cancelada",
            order: canceledOrder
        });
    } catch (error) {
        console.error("Error en deleteOrder:", error);
        return res.status(500).json({ message: "Error al cancelar la orden", error });
    }
};


// OBTENER todas las ordenes
export const getOrders = async (req: Request, res: Response) => {
    try {
        // solo órdenes que no estén canceladas
        const orders = await Order.find({ status: { $ne: "cancelado" } });

        return res.json({ orders });
    } catch (error) {
        console.error("Error en getOrders:", error);
        return res.status(500).json({ message: "Error al obtener órdenes", error });
    }
};


