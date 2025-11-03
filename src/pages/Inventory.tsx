import {ProductCard} from "../components/ProductCard.tsx";
import {useEffect, useState} from "react";
import type {Variant} from "../Types/VariantType.ts";
import {getAllVariants} from "../axiosClient.ts";
import {Button, Col, Row} from "reactstrap";
import type {Product} from "../Types/ProductType.ts";
import {OffcanvasColorpicker} from "../components/OffcanvasColorpicker.tsx";

export const Inventory = () => {

    const [variants, setVariants] = useState<Variant[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | undefined>('');

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    const updateVariants = async () => {
        const result: Variant[] = await getAllVariants();
        setVariants(result);
    }

    const filteredVariants = selectedColor
        ? variants.filter(v => v.color?.label.toLowerCase() === selectedColor.toLowerCase())
        : variants;


    useEffect(() => {
        updateVariants();
    }, []);

    return (
        <div className='p-5'>
            <Button color="primary" onClick={toggleFilter} className="mb-3">
                Filter by Color
            </Button>

            <OffcanvasColorpicker isOpen={isFilterOpen}
                                  toggle={toggleFilter}
                                  color={selectedColor}
                                  setColor={setSelectedColor}
                                  variants={variants}/>

            <Row>
                {Object.values(
                    filteredVariants.reduce((acc, variant) => {
                        const key: number = variant.product.id || 0;
                        if (!acc[key]) {
                            acc[key] = { product: variant.product, variants: [] };
                        }
                        acc[key].variants.push(variant);
                        return acc;
                    }, {} as Record<number, { product: Product; variants: Variant[] }>)
                ).map(({ product, variants }) => (
                    <Col key={product.id} lg="4" md="6" sm="12">
                        <ProductCard product={product} variants={variants} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}