import {useEffect, useState} from "react";
import type {Color} from "../Types/ColorType.ts";
import {createColor, deleteColorByID, getAllColors, putColor} from "../axiosClient.ts";
import {Button, Table} from "reactstrap";
import {ModalColor} from "./ModalColor.tsx";


export const TableColors = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingColor, setEditingColor] = useState<Color | null>(null);

    const updateColors = async () => {
        const result: Color[] = await getAllColors();
        setColors(result);
    }

    useEffect(() => {
            updateColors();
        }, []);

    const handleSubmit = async (data: Color) => {
        try {
            if (editingColor) {
                await putColor(data);
            } else {
                await createColor(data);
            }
            await updateColors();
        } catch (err) {
            console.error("Failed to save color", err);
        } finally {
            setModalOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteColorByID(id);
        await updateColors();
    }

    return (
        <div className='m-5'>
            Colors
            <Button className='mx-3' onClick={ () => {
                setEditingColor(null);
                setModalOpen(true);
            }}>Add</Button>
                <Table>
                    <thead>
                    <tr>
                        <th>id#</th>
                        <th>code</th>
                        <th>label</th>
                        <th>swatch</th>
                        <th style={{ width: '80px' }}>edit</th>
                        <th style={{ width: '80px' }}>delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {colors.map((color) => (
                        <tr key={color.id}>
                            <td>{color.id}</td>
                            <td>{color.code}</td>
                            <td>{color.label}</td>
                            <td>
                                <div
                                    style={{
                                        backgroundColor: color.hex,
                                        width: "24px",
                                        height: "24px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </td>
                            <td><Button style={{ width: '80px' }} onClick={ () => {
                                setEditingColor(color);
                                setModalOpen(true);
                            }}>Edit</Button></td>
                            <td><Button style={{ width: '80px' }} onClick={() => {if (color.id) handleDelete(color.id)}}>Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            <ModalColor
                isOpen={modalOpen}
                toggle={() => setModalOpen(false)}
                initialData={editingColor ?? undefined}
                onSubmit={handleSubmit}/>
        </div>
    )
}