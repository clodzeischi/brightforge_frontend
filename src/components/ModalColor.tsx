import React, {useEffect, useState} from 'react';
import {Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input} from 'reactstrap';
import type {Color} from "../Types/ColorType.ts";

export const ModalColor = (
    isOpen: boolean,
    toggle: () => void,
    initialData?: Partial<Color>,
    onSubmit: (data: Color) => Promise<void>) => {

    const [form, setForm] = useState<Partial<Color>>({
        code: '',
        label: '',
        hex: '',
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData });
        } else {
            setForm({ code: '', label: '', hex: '' });
        }
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit(form);
        toggle();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add/edit color</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="code">Code</Label>
                        <Input
                            name="code"
                            value={form.code ?? ""}
                            onChange={handleChange}
                            placeholder="e.g. BRGHT-001"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="label">Label</Label>
                        <Input
                            name="label"
                            value={form.label ?? ""}
                            onChange={handleChange}
                            placeholder="e.g. Bright Gold"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="hex">Hex</Label>
                        <Input
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
                    Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}