
const initialState = {

    allProducts: [],
    selectedItem: {},
    categoryVice: [],
    searchState: []
};



export default function ecommReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload
            };
        case 'FETCH_SELECTED_ITEM':
            return {
                ...state,
                selectedItem: action.payload
            };

        case 'FETCH_CATEGORY_ITEM':
            return {
                ...state,
                categoryVice: action.payload
            };

        case 'SEARCH_PRODUCTS':
            return {
                ...state,
                searchState: action.payload
            };
        default:
            return state;
    }
}
