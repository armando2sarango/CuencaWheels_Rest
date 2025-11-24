import { createSlice } from '@reduxjs/toolkit';
import { fetchfacturas, createFacturaThunk, updateFacturaThunk, deleteFacturaThunk } from './thunks';

const initialState = {
  facturas: [],
  loading: false,
  error: null
};

const facturasSlice = createSlice({
  name: 'facturas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchfacturas.pending, (state) => { state.loading = true; })
      .addCase(fetchfacturas.fulfilled, (state, action) => {
        state.loading = false;
        state.facturas = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchfacturas.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      
      // CREATE
      .addCase(createFacturaThunk.fulfilled, (state) => { state.loading = false; })
      
      // UPDATE
      .addCase(updateFacturaThunk.fulfilled, (state) => { state.loading = false; })
      
      // DELETE
      .addCase(deleteFacturaThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
           state.facturas = state.facturas.filter(f => f.IdFactura !== action.payload.idFactura);
        }
      });
  }
});

export default facturasSlice.reducer;