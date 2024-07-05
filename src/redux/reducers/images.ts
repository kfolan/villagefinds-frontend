import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface vendorImages {
  logoUrl: String;
  finderUrl: String;
  slideUrls: [String];
}

export interface vendorImageState {
  vendorImages: vendorImages;
}

const initialState: vendorImageState = {
  vendorImages: {
    logoUrl: '',
    finderUrl: '',
    slideUrls: ['']
  }
};


export const imageReducer = createSlice({
  name: 'vimages',
  initialState,
  reducers: {
    loadImages: (
      state: vendorImageState,
      action: PayloadAction<vendorImages>,
    ) => {
      state.vendorImages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadImages } = imageReducer.actions;

export default imageReducer.reducer;
