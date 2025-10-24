import axios from 'axios';
import type {Color} from "./Types/ColorType.ts";
import type {Product} from "./Types/ProductType.ts";
import type {Variant} from "./Types/VariantType.ts";

export const createColor = async (color: Partial<Color>): Promise<Color | null> => {
    try {
        const res = await axios.post('http://localhost:8080/api/color', color);
        return res.data;
    } catch (err) {
        alert('Unable to create color.');
        return null;
    }
}

export const getAllColors = async (): Promise<Color[]> => {
    try {
        const res = await axios.get('http://localhost:8080/api/color');
        return res.data;
    } catch (err) {
        alert('Unable to get colors.');
        return [];
    }
}

export const getColorByID = async (id: number): Promise<Color | null> => {
    try {
        const res = await axios.get(`http://localhost:8080/api/color/${id}`);
        return res.data;
    } catch (err) {
        alert('Unable to get colors.');
        return null;
    }
}

export const putColor = async (color: Color): Promise<Color | null> => {
    try {
        const res = await axios.put('http://localhost:8080/api/color', color);
        return res.data;
    } catch (err) {
        alert('Unable to update color.');
        return null;
    }
}

export const deleteColorByID = async (id: number) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/color/${id}`);
    } catch (err) {
        alert('Unable to delete color. There may be variants that are still using it.');
    }
}

export const createProduct = async (product: Partial<Product>): Promise<Product | null> => {
    try {
        const res = await axios.post('http://localhost:8080/api/product', product);
        return res.data;
    } catch (err) {
        alert('Unable to create product.');
        return null;
    }
}

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const res = await axios.get('http://localhost:8080/api/product');
        return res.data;
    } catch (err) {
        alert('Unable to get products.');
        return [];
    }
}

export const getProductByID = async (id: number): Promise<Product | null> => {
    try {
        const res = await axios.get(`http://localhost:8080/api/product/${id}`);
        return res.data;
    } catch (err) {
        alert('Unable to get product.');
        return null;
    }
}

export const putProduct = async (product: Product): Promise<Product> => {
    try {

    } catch (err) {
        alert('Unable to update product.')
    }
}

export const deleteProductByID = async (id: number) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/product/${id}`);
    } catch (err) {
        alert('Unable to delete product. There may be variants that are still using it.');
    }
}

export const createVariant = async (variant: Partial<Variant>): Promise<Variant | null> => {
    try {
        const res = await axios.post('http://localhost:8080/api/variant', variant);
        return res.data;
    } catch (err) {
        alert('Unable to create variant.');
        return null;
    }
}

export const getAllVariants = async (): Promise<Variant[]> => {
    try {
        const res = await axios.get('http://localhost:8080/api/variant');
        return res.data;
    } catch (err) {
        alert('Unable to get variants.');
        return [];
    }
}

export const getVariantByID = async (id: number): Promise<Variant | null> => {
    try {
        const res = await axios.get(`http://localhost:8080/api/product/${id}`);
        return res.data;
    } catch (err) {
        alert('Unable to get variant.');
        return null;
    }
}

export const getVariantsByColorCode = async (colorLabel: string): Promise<Variant[]> => {
    try {
        const res = await axios.get('http://localhost:8080/api/variant/bycolor', {params: {colorLabel}});
        return res.data;
    } catch (err) {
        alert('Unable to get variants.');
        return [];
    }
}

export const putVariant = async (variant: Variant): Promise<Variant | null> => {
    try {
        const res = await axios.put('http://localhost:8080/api/variant', variant);
        return res.data;
    } catch (err) {
        alert('Unable to update variant.');
        return null;
    }
}

export const deleteVariantByID = async (id: number) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/variant/${id}`);
    } catch (err) {
        alert('Unable to delete variant.');
    }
}

