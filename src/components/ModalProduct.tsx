import {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import type {Product} from "../Types/ProductType.ts";
import * as React from "react";

type ModalProductProps = {
    isOpen: boolean;
    toggle: () => void;
    initialData?: Product;
    onSubmit: (data: Product) => Promise<void>;
}

export const ModalProduct = ({isOpen, toggle, initialData, onSubmit} : ModalProductProps) => {

    const [form, setForm] = useState<Product>({
        slug: '',
        name: '',
        description: '',
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData });
        } else {
            setForm({ slug: '', name: '', description: '' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(form as Product)
            .then(() => toggle());
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add/edit product</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="slug">Slug</Label>
                        <Input
                            name="slug"
                            value={form.slug ?? ""}
                            onChange={handleChange}
                            placeholder="shiznit"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            name="name"
                            value={form.name ?? ""}
                            onChange={handleChange}
                            placeholder="Cosmic Shiznit"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            name="description"
                            value={form.description ?? ""}
                            onChange={handleChange}
                            placeholder="Listens to you without judgement."
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