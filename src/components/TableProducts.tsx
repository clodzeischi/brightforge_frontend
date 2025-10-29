import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import type {Product} from "../Types/ProductType.ts";
import {createProduct, deleteProductByID, getAllProducts, putProduct} from "../axiosClient.ts";
import {ModalProduct} from "./ModalProduct.tsx";


export const TableProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const updateProducts = async () => {
        const result: Product[] = await getAllProducts();
        setProducts(result);
    }

    useEffect(() => {
        updateProducts();
    }, []);

    const handleSubmit = async (data: Product) => {
        try {
            if (editingProduct) {
                await putProduct(data);
            } else {
                await createProduct(data);
            }
            await updateProducts();
        } catch (err) {
            console.error("Failed to save product", err);
        } finally {
            setModalOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteProductByID(id);
        await updateProducts();
    }

    return (
        <div className='m-5'>
            Products
            <Button className='mx-3' onClick={ () => {
                setEditingProduct(null);
                setModalOpen(true);
            }}>Add</Button>
            <Table>
                <thead>
                <tr>
                    <th>id#</th>
                    <th>slug</th>
                    <th>name</th>
                    <th>description</th>
                    <th style={{ width: '80px' }}>edit</th>
                    <th style={{ width: '80px' }}>delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.slug}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td><Button style={{ width: '80px' }} onClick={() => {
                            setEditingProduct(product);
                            setModalOpen(true);
                        }}>Edit</Button></td>
                        <td><Button style={{ width: '80px' }} onClick={() => {
                            if (product.id) handleDelete(product.id)}}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ModalProduct
                isOpen={modalOpen}
                toggle={() => setModalOpen(false)}
                initialData={editingProduct ?? undefined}
                onSubmit={handleSubmit} />
        </div>
    )
}