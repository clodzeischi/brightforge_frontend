import type {Product} from "./ProductType.ts";
import type {Color} from "./ColorType.ts";
import type {ProductStatus} from "./StatusType.ts";

export type Variant = {
    id?: number,
    product: Product,
    color: Color,
    imageUrl: string,
    rating?: number,
    qty: number,
    lifecycleStatus: ProductStatus,
    createdAt?: string,
    updatedAt?: string
}
