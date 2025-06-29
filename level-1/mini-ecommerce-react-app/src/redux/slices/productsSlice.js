// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Dummy fetchProducts for now – can be replaced with real API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  await new Promise((res) => setTimeout(res, 500));
  return [
    { id: 1, name: 'Gold Necklace', price: 20000 },
    { id: 2, name: 'Diamond Ring', price: 50000 },
  ];
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
