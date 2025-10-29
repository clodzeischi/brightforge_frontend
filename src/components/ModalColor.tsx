import {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import type {Color} from "../Types/ColorType.ts";
import * as React from "react";

type ModalColorProps = {
    isOpen: boolean;
    toggle: () => void;
    initialData?: Color;
    onSubmit: (data: Color) => Promise<void>;
}

export const ModalColor = ({isOpen, toggle, initialData, onSubmit} : ModalColorProps) => {

    const [form, setForm] = useState<Color>({id: undefined, code: '', label: '', hex: ''});

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData });
        } else {
            setForm({ id: undefined, code: '', label: '', hex: '' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(form as Color)
            .then(() => toggle());
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add/edit color</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="code">Code</Label>
                        <Input id="code"
                            name="code"
                            value={form.code ?? ""}
                            onChange={handleChange}
                            placeholder="black"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="label">Label</Label>
                        <Input id="label"
                            name="label"
                            value={form.label ?? ""}
                            onChange={handleChange}
                            placeholder="Doom black"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="hex">Hex</Label>
                        <Input id="hex"
                            name="hex"
                            value={form.hex ?? ""}
                            onChange={handleChange}
                            placeholder="#FFD700"
                            type="color"
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}