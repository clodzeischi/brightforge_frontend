import {useEffect, useState} from "react";
import {api} from "../axiosClient.ts";
import {Button, Table} from "reactstrap";
import type {Product} from "../Types/ProductType.ts";


export const TableProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get<Product[]>('/product')
            .then(res => setProducts(res.data))
            .catch((err) => console.error("Unable to get products.", err));
    }, []);

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
                        <td><Button>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>

        </div>
    )
}