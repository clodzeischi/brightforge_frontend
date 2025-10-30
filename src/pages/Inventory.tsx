import {ProductCard} from "../components/ProductCard.tsx";
import {useEffect, useState} from "react";
import type {Variant} from "../Types/VariantType.ts";
import {getAllVariants} from "../axiosClient.ts";
import {Col, Row} from "reactstrap";
import type {Product} from "../Types/ProductType.ts";

export const Inventory = () => {

    const [variants, setVariants] = useState<Variant[]>([]);

    const updateVariants = async () => {
        const result: Variant[] = await getAllVariants();
        setVariants(result);
    }

    useEffect(() => {
        updateVariants();
    }, []);

    return (
        <div className='p-5'>
            <Row>
                {Object.values(
                    variants.reduce((acc, variant) => {
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