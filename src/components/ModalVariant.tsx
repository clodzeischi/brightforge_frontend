import type {Variant} from "../Types/VariantType.ts";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import type {Color} from "../Types/ColorType.ts";
import type {Product} from "../Types/ProductType.ts";
import {getAllColors, getAllProducts} from "../axiosClient.ts";
import type {ProductStatus} from "../Types/StatusType.ts";

type ModalVariantProps = {
    isOpen: boolean;
    toggle: () => void;
    initialData?: Variant;
    onSubmit: (data: Variant) => Promise<void>;
}

export const ModalVariant = ({isOpen, toggle, initialData, onSubmit} : ModalVariantProps) => {

    const [form, setForm] = useState<Variant>({
        id: undefined,
        product: {slug: "", name: "", description: ""},
        color: {code: "", label: "", hex: ""},
        imageUrl: '',
        qty: 1,
        lifecycleStatus: 'ACTIVE',});

    const [products, setProducts] = useState<Product[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData });
        } else {
            setForm({
                id: undefined,
                product: {slug: "", name: "", description: ""},
                color: {code: "", label: "", hex: ""},
                imageUrl: '',
                qty: 1,
                lifecycleStatus: 'ACTIVE',});
        }

        async function updateProductsAndColors() {
            setProducts(await getAllProducts());
            setColors(await getAllColors());
        }

        updateProductsAndColors();

    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "qty" ? Number(value) : value
        }));
    };


    const handleSubmit = () => {
        onSubmit(form as Variant)
            .then(() => toggle());
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add/edit Variant</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="product">
                            Product
                        </Label>
                        <Input
                            id="product"
                            name="product"
                            type="select"
                            value={form.product?.id ?? ''}
                            onChange={(e) => {
                                const selectedId = Number(e.target.value);
                                const selectedProduct = products.find(p => p.id === selectedId);
                                if (selectedProduct) {
                                    setForm(prev => ({ ...prev, product: selectedProduct }));
                                }
                            }}>
                            {products.map((product: Product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="color">
                            Select
                        </Label>
                        <Input
                            id="color"
                            name="color"
                            type="select"
                            value={form.color?.id ?? ''}
                            onChange={(e) => {
                                const selectedId = Number(e.target.value);
                                const selectedColor = colors.find(c => c.id === selectedId);
                                if (selectedColor) {
                                    setForm(prev => ({ ...prev, color: selectedColor }));
                                }
                            }}>
                            {colors.map((color: Color) => (
                                <option key={color.id} value={color.id}>
                                    {color.label}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageUrl">Image file</Label>
                        <Input
                            name="imageUrl"
                            value={form.imageUrl ?? ""}
                            onChange={handleChange}
                            placeholder="placeholder.png"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="qty">Quantity</Label>
                        <Input id="qty"
                            name="qty"
                            type="number"
                            value={form.qty ?? 1}
                               onChange={(e) => {
                                const quantity = Number(e.target.value);
                                setForm((prev) => ({ ...prev, qty: quantity }));
                            }}
                               placeholder="1"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">
                            Select
                        </Label>
                        <Input
                            id="status"
                            name="lifecycleStatus"
                            type="select"
                            value={form.lifecycleStatus ?? 'ACTIVE'}
                            onChange={(e) => {
                                const selected = e.target.value as ProductStatus;
                                setForm((prev) => ({ ...prev, lifecycleStatus: selected }));
                            }}>
                            <option value='ACTIVE'>ACTIVE</option>
                            <option value='OOS_PERMANENT'>OOS_PERMANENT</option>
                            <option value='RETIRED'>RETIRED</option>
                            <option value='DELETED'>DELETED</option>
                        </Input>
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