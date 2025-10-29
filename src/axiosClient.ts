import axios from 'axios';
import type {Color} from "./Types/ColorType.ts";
import type {Product} from "./Types/ProductType.ts";
import type {Variant} from "./Types/VariantType.ts";

const baseURL: string = 'http://localhost:8080/api';

export const createColor = async (color: Partial<Color>): Promise<Color | null> => {
    try {
        const res = await axios.post(`${baseURL}/color`, color);
        return res.data;
    } catch (err) {
        alert(`Unable to create color. ${err}`);
        return null;
    }
}

export const getAllColors = async (): Promise<Color[]> => {
    try {
        const res = await axios.get(`${baseURL}/color`);
        return res.data;
    } catch (err) {
        alert(`Unable to get colors. ${err}`);
        return [];
    }
}

export const getColorByID = async (id: number): Promise<Color | null> => {
    try {
        const res = await axios.get(`${baseURL}/color/${id}`);
        return res.data;
    } catch (err) {
        alert(`Unable to get colors. ${err}`);
        return null;
    }
}

export const putColor = async (color: Color): Promise<Color | null> => {
    try {
        const res = await axios.put(`${baseURL}/color`, color);
        return res.data;
    } catch (err) {
        alert(`Unable to update color. ${err}`);
        return null;
    }
}

export const deleteColorByID = async (id: number) => {
    try {
        await axios.delete(baseURL + `/color/${id}`);
    } catch (err) {
        alert(`Unable to delete color. There may be variants that are still using it. ${err}`);
    }
}

export const createProduct = async (product: Product): Promise<Product | null> => {
    try {
        const res = await axios.post(`${baseURL}/product`, product);
        return res.data;
    } catch (err) {
        alert(`Unable to create product. ${err}`);
        return null;
    }
}

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const res = await axios.get(`${baseURL}/product`);
        return res.data;
    } catch (err) {
        alert(`Unable to get products. ${err}`);
        return [];
    }
}

export const getProductByID = async (id: number): Promise<Product | null> => {
    try {
        const res = await axios.get(`${baseURL}/product/${id}`);
        return res.data;
    } catch (err) {
        alert(`Unable to get product. ${err}`);
        return null;
    }
}

export const putProduct = async (product: Product): Promise<Product | null> => {
    try {
        const res = await axios.put(`${baseURL}/product`, product);
        return res.data;
    } catch (err) {
        alert(`Unable to update product. ${err}`)
        return null;
    }
}

export const deleteProductByID = async (id: number) => {
    try {
        await axios.delete(`${baseURL}/product/${id}`);
    } catch (err) {
        alert(`Unable to delete product. There may be variants that are still using it. ${err}`);
    }
}

export const createVariant = async (variant: Variant): Promise<Variant | null> => {
    try {
        const res = await axios.post(`${baseURL}/variant`, variant);
        return res.data;
    } catch (err) {
        alert(`Unable to create variant. ${err}`);
        return null;
    }
}

export const getAllVariants = async (): Promise<Variant[]> => {
    try {
        const res = await axios.get(`${baseURL}/variant`);
        return res.data;
    } catch (err) {
        alert(`Unable to get variants. ${err}`);
        return [];
    }
}

export const getVariantByID = async (id: number): Promise<Variant | null> => {
    try {
        const res = await axios.get(`${baseURL}/variant/${id}`);
        return res.data;
    } catch (err) {
        alert(`Unable to get variant. ${err}`);
        return null;
    }
}

export const putVariant = async (variant: Variant): Promise<Variant | null> => {
    try {
        const res = await axios.put(`${baseURL}/variant/${variant.id}`, variant);
        return res.data;
    } catch (err) {
        alert(`Unable to update variant. ${err}`);
        return null;
    }
}

export const deleteVariantByID = async (id: number) => {
    try {
        await axios.delete(`${baseURL}/variant/${id}`);
    } catch (err) {
        alert(`Unable to delete variant. ${err}`);
    }
}

