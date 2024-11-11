import toast from "react-hot-toast";
import { AppDispatch } from "../store";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const FETCH_SELECTED_ITEM = "FETCH_SELECTED_ITEM"
export const FETCH_CATEGORY_ITEM = "FETCH_CATEGORY_ITEM"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const fetchProducts = (): any => {
    return async (dispatch: any) => {

        try {
            const response = await fetch('https://ec-backend-1d8l.onrender.com/get-products');
            const data = await response.json();
            dispatch({ type: FETCH_PRODUCTS, payload: data });
        } catch (error) {

            toast.error("Error while fetching products")
        }
    };
};

export const fetchSelectedProducts = (id: string): any => {
    return async (dispatch: any) => {
        try {
            const response = await fetch('https://ec-backend-1d8l.onrender.com/get-selected-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            dispatch({ type: FETCH_SELECTED_ITEM, payload: data });
        } catch (error) {
            toast.error("Error while fetching products");
        }
    };
};

export const fetchCategoryViceProducts = (category: string): any => {
    return async (dispatch: any) => {

        try {
            const response = await fetch('https://ec-backend-1d8l.onrender.com/get-category-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();


            console.log(data)
            dispatch({ type: FETCH_CATEGORY_ITEM, payload: data });
        } catch (error) {
            toast.error("Error while fetching products");
        }
    };
};


export const SearchViceProducts = (searchText: string): any => {
    return async (dispatch: any) => {
        console.log("serachtext", searchText)
        try {
            const response = await fetch('https://ec-backend-1d8l.onrender.com/search-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchText })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();


            console.log(data)
            dispatch({ type: SEARCH_PRODUCTS, payload: data });
            return data;
        } catch (error) {
            toast.error("Error while fetching products");
        }
    };
};

