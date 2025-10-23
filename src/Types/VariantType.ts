import type {Product} from "./ProductType.ts";
import type {Color} from "./ColorType.ts";

export type Variant = {
    id: number,
    product: Product,
    color: Color,
    imageUrl: string,
    rating: number,
    qty: number,
    lifecycleStatus: 'ACTIVE' | 'OOS_PERMANENT' | 'RETIRED' | 'DELETED'
    createdAt: string,
    updatedAt: string
}