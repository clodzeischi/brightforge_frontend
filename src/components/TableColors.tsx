import {useEffect, useState} from "react";
import type {Color} from "../Types/ColorType.ts";
import {api} from "../axiosClient.ts";
import {Button, Table} from "reactstrap";


export const TableColors = () => {
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
            api.get<Color[]>('/color')
                .then(res => setColors(res.data))
                .catch((err) => console.error("Unable to get colors.", err));
        }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingColor, setEditingColor] = useState<Color | null>(null);

    return (
        <div className='m-5'>
            Colors
            <Button className='mx-3'>Add</Button>
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
                            <td><Button>Edit</Button></td>
                            <td><Button>Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

        </div>
    )
}