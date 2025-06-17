import { Request, Response } from "express";
import { Product } from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, qty, price } = req.body;

        const newProduct = new Product({
            name,
            description,
            qty,
            price,
            createDate: new Date()
        });

        await newProduct.save();
        res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};



//UPDATE productos
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ message: "Producto actualizado", product: updatedProduct });
    } catch (error) {
        console.error("Error en updateProduct:", error);
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
};


// DELETE producto (solo estatus)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ message: "Producto desactivado", product: deletedProduct });
    } catch (error) {
        console.error("Error en deleteProduct:", error);
        res.status(500).json({ message: "Error al desactivar el producto", error });
    }
};


// CONSULTAR todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ status: true });

        return res.json({ products });
    } catch (error) {
        console.error("Error en traer todos los productos:", error);
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};


