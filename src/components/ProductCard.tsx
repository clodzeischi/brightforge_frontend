import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import type {Variant} from "../Types/VariantType.ts";
import type {Product} from "../Types/ProductType.ts";
import {useState} from "react";


export const ProductCard = ({product, variants} : {product : Product, variants: Variant[]}) => {

    const [varDisplayed, setVarDisplayed] = useState<number>(0);

    return (
        <Card className='m-5 shadow-lg' style={{width: '18rem', borderRadius: '10px'}}>
            <img alt={product.slug} src={variants[varDisplayed].imageUrl} style={{height: '150px', objectFit: 'contain'}}/>
            <CardBody>
                <CardTitle tag="h5">
                    {product.name}
                </CardTitle>
                <CardText className="mb-2 text-muted" tag="h6">
                    {product.description}
                </CardText>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Available: {variants[varDisplayed].qty}
                </CardSubtitle>

                <div style={{display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap'}}>
                    {variants.map((variant, index) => (
                        <div
                            key={variant.color.code}
                            onClick={() => setVarDisplayed(index)}
                            title={variant.color.label}
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: variant.color.hex,
                                border: index === varDisplayed ? '2px solid black' : '1px solid #ccc',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>

                <Button>
                    Add
                </Button>
            </CardBody>
        </Card>
    )
}




