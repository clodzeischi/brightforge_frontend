import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import type {Product} from "../Types/ProductType.ts";
import {deleteProductByID, getAllProducts} from "../axiosClient.ts";


export const TableProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const updateProducts = async () => {
            const result = await getAllProducts();
            setProducts(result);
        }

        updateProducts();
    }, []);

    const handleDelete = (id: number) => {
        deleteProductByID(id);
    }

    return (
        <div className='m-5'>
            Products
            <Button className='mx-3'>Add</Button>
            <Table>
                <thead>
                <tr>
                    <th>id#</th>
                    <th>slug</th>
                    <th>name</th>
                    <th>description</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.slug}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td><Button>Edit</Button></td>
                        <td><Button onClick={() => {handleDelete(product.id)}}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>

        </div>
    )
}