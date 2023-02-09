import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: {
      bannerName: "",
      bannerDesc: "",
      bannerImage: "",
      bannerColorBg: "",
      bannerUrl: "",
      createdAt: null,
      updatedAt: null,
      isVisiabled: false,
      deletedAt: null,
      isDeleted: false,
    },
    banners: [],
    showAddBanner: false,
    showEditBanner: false,
  },
  reducers: {
    setBanner: (state, actions) => ({
      ...state,
      banner: {
        ...state.banner,
        [actions.payload.name]: actions.payload.value,
      },
    }),
    getBanner: (state, actions) => ({
      ...state,
      banner: actions.payload,
    }),
    updateBanner: () => {},
    resetBanner: (state, payload) => ({
      ...state,
      banner: {
        bannerName: "",
        bannerDesc: "",
        bannerImage: "",
        bannerColorBg: "",
        bannerUrl: "",
        createdAt: null,
        updatedAt: null,
        isVisiabled: false,
        deletedAt: null,
        isDeleted: false,
      },
    }),
    addBanner: () => {},
    getBanners: () => {},
    setBanners: (state, actions) => ({
      ...state,
      banners: actions.payload,
    }),
    setShowAddBanner: (state, actions) => ({
      ...state,
      showAddBanner: actions.payload,
    }),
    setShowEditBanner: (state, actions) => ({
      ...state,
      showEditBanner: actions.payload,
    }),
  },
});

export const {
  setBanner,
  getBanner,
  resetBanner,
  addBanner,
  updateBanner,
  getBanners,
  setBanners,
  setShowAddBanner,
  setShowEditBanner,
} = bannerSlice.actions;
export default bannerSlice.reducer;
