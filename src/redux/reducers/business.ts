import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface businessName {
  name: String,
  owner: String,
  email: String,
  phone: String,
  address: String,
  zipcode: String,
  password: String
}

export interface businessNameState {
  businessName: businessName;
}

const initialState: businessNameState = {
  businessName: {
    name: '',
    owner: '',
    email:'',
    phone: '',
    address: '',
    zipcode: '',
    password:''
  }
};


export const businessReducer = createSlice({
  name: 'vbusiness',
  initialState,
  reducers: {
    loadBusiness: (
      state: businessNameState,
      action: PayloadAction<businessName>,
    ) => {
      state.businessName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadBusiness } = businessReducer.actions;

export default businessReducer.reducer;
