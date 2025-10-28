import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import type {Variant} from "../Types/VariantType.ts";
import {deleteVariantByID, getAllVariants} from "../axiosClient.ts";

export const TableVariants = () => {
    const [variants, setVariants] = useState<Variant[]>([]);

    useEffect(() => {
        const updateVariants = async () => {
            const result = await getAllVariants();
            setVariants(result);
        }

        updateVariants();
    }, []);

    const handleDelete = (id: number) => {
        deleteVariantByID(id);
    }

    return (
        <div className='m-5'>
            Variants
            <Button className='mx-3'>Add</Button>
            <Table>
                <thead>
                <tr>
                    <th>id#</th>
                    <th>product</th>
                    <th>color</th>
                    <th>image</th>
                    <th>quantity</th>
                    <th>lifecycle</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {variants.map((variant) => (
                    <tr key={variant.id}>
                        <td>{variant.id}</td>
                        <td>{variant.product.name}</td>
                        <td>{variant.color.label}</td>
                        <td>
                            <img
                                src={`/${variant.imageUrl}`}
                                alt={`Variant ${variant.id}`}
                                style={{ width: '48px', height: '48px', objectFit: 'cover'}}
                            />
                        </td>
                        <td>{variant.qty}</td>
                        <td>{variant.lifecycleStatus}</td>
                        <td><Button>Edit</Button></td>
                        <td><Button onClick={() => handleDelete(variant.id)}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}