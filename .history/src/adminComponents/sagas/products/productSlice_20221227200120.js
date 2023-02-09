import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {
      productName: "",
      amount: null,
      slug: "",
      price: null,
      discountPrice: null,
      productDesc: "",
      visibility: false,
      detailedOverview: "",
      categoryName: "",
      categoryId: "",
      images: [],
      properties: {
        color: [],
      },
      tag: [],
      transpostInfo: {
        weight: null,
        width: null,
        height: null,
        longs: null,
      },
      rates: [],
      createdAt: "",
      updatedAt: "",
      isDeleted: false,
      deletedAt: "",
      sellNumber: null,
      numberViews: null,
    },
    products: [],
    focusItem: "",
    modalEdit: false,
    filter: {
      search: "",
      categoryId: "",
      sortBy: {},
    },
  },
  reducers: {
    setProduct: (state, action) => ({
      ...state,
      product: {
        ...state.product,
        [action.payload.name]: action.payload.value,
      },
    }),
    resetProduct: (state, action) => ({
      ...state,
      product: {
        productName: "",
        amount: null,
        slug: "",
        price: null,
        discountPrice: null,
        productDesc: "",
        visibility: false,
        detailedOverview: "",
        categoryName: "",
        categoryId: "",
        images: [],
        properties: {
          color: [],
        },
        tag: [],
        transpostInfo: {
          weight: "",
          width: "",
          height: "",
          longs: "",
        },
        rates: [],
        createdAt: "",
        updatedAt: "",
        isDeleted: false,
        deletedAt: "",
        sellNumber: null,
        numberViews: null,
      },
    }),
    getProduct: (state, action) => ({ ...state, product: action.payload }),
    getProductDetail: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    getProducts: () => {},
    setProducts: (state, action) => ({
      ...state,
      products: action.payload,
    }),
    setFocusItem: (state, action) => ({
      ...state,
      focusItem: action.payload,
    }),
    setModalEdit: (state, action) => ({
      ...state,
      modalEdit: action.payload,
    }),
    setFilter: (state, action) => ({
      ...state,
      filter: {
        ...state.filter,
        [action.payload.name]: action.payload.value,
      },
    }),
  },
});

export const {
  setProduct,
  resetProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  getProducts,
  setProducts,
  setFocusItem,
  getProduct,
  setModalEdit,
  setFilter,
} = productSlice.actions;
export default productSlice.reducer;
