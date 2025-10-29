import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import type {Variant} from "../Types/VariantType.ts";
import {createVariant, deleteVariantByID, getAllVariants, putVariant} from "../axiosClient.ts";
import {ModalVariant} from "./ModalVariant.tsx";

export const TableVariants = () => {
    const [variants, setVariants] = useState<Variant[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingVariant, setEditingVariant] = useState<Variant | null>(null);

    const updateVariants = async () => {
        const result: Variant[] = await getAllVariants();
        setVariants(result);
    }

    useEffect(() => {
        updateVariants();
    }, []);

    const handleSubmit = async (data: Variant) => {
        try {
            if (editingVariant) {
                await putVariant(data);
            } else {
                await createVariant(data);
            }
            await updateVariants();
        } catch (err) {
            console.error("Failed to save variant", err);
        } finally {
            setModalOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteVariantByID(id);
        await updateVariants();
    }

    return (
        <div className='m-5'>
            Variants
            <Button className='mx-3' onClick={ () => {
                setEditingVariant(null);
                setModalOpen(true);
            }}>Add</Button>
            <Table>
                <thead>
                <tr>
                    <th>id#</th>
                    <th>product</th>
                    <th>color</th>
                    <th>image</th>
                    <th>quantity</th>
                    <th>lifecycle</th>
                    <th style={{ width: '80px' }}>edit</th>
                    <th style={{ width: '80px' }}>delete</th>
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
                        <td><Button style={{ width: '80px' }} onClick={ () => {
                            setEditingVariant(variant);
                            setModalOpen(true);
                        }}>Edit</Button></td>
                        <td><Button style={{ width: '80px' }} onClick={() => {
                            if (variant.id) handleDelete(variant.id)}}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
                <ModalVariant
                    isOpen={modalOpen}
                    toggle={() => setModalOpen(false)}
                    initialData={editingVariant ?? undefined}
                    onSubmit={handleSubmit} />
            </Table>
        </div>
    )
}