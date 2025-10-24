import {useEffect, useState} from "react";
import type {Color} from "../Types/ColorType.ts";
import {api} from "../axiosClient.ts";
import {Button, Table} from "reactstrap";
import {ModalColor} from "./ModalColor.tsx";


export const TableColors = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingColor, setEditingColor] = useState<Color | null>(null);

    useEffect(() => {
            api.get<Color[]>('/color')
                .then(res => setColors(res.data))
                .catch((err) => console.error("Unable to get colors.", err));
        }, []);

    const handleSubmit = async (data: Color) => {
        try {
            if (editingColor) {
                await api.put(`/color/${data.id}`, data);
            } else {
                await api.post('/color', data);
            }
            const updated = await api.get<Color[]>('/color');
            setColors(updated.data);
        } catch (err) {
            console.error("Failed to save color", err);
        } finally {
            setModalOpen(false);
        }
    };

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
                        <th>edit</th>
                        <th>delete</th>
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
                            <td><Button onClick={ () => {
                                setEditingColor(color);
                                setModalOpen(true);
                            }}>Edit</Button></td>
                            <td><Button>Delete</Button></td>
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