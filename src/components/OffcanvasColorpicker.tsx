import {FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader} from "reactstrap";
import type {Variant} from "../Types/VariantType.ts";

type OffcanvasProps = {
    isOpen: boolean;
    toggle: () => void;
    color: string | undefined;
    setColor: (data: string | undefined) => void;
    variants: Variant[]
}

export const OffcanvasColorpicker = (
    {isOpen, toggle, color, setColor, variants} : OffcanvasProps) => {

    return (
        <Offcanvas direction="start" isOpen={isOpen} toggle={toggle}>
            <OffcanvasHeader toggle={toggle}>Color Filter</OffcanvasHeader>
            <OffcanvasBody>
                <FormGroup>
                    <Label for="colorSelect">Select a color</Label>
                    <Input
                        type="select"
                        id="colorSelect"
                        value={color ?? ''}
                        onChange={(e) => setColor(e.target.value || undefined)}
                    >
                        <option value="">All Colors</option>
                        {Array.from(
                            new Set(
                                variants
                                    .map(v => v.color?.label.trim())
                                    .filter((c): c is string => !!c)
                            )
                        ).map((color, idx) => (
                            <option key={idx} value={color}>{color}</option>
                        ))}
                    </Input>
                </FormGroup>
            </OffcanvasBody>
        </Offcanvas>
    );
}