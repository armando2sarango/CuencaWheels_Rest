import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCarritos, createCarritoThunk, updateCarritoThunk, deleteCarritoThunk
} from './thunks';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const carritosSlice = createSlice({
  name: 'carritos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ---
      .addCase(fetchCarritos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarritos.fulfilled, (state, action) => {
        state.loading = false;
        // Aseguramos que sea un array
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCarritos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar el carrito';
      })
      
      // --- CREATE (Agregar al carrito) ---
      .addCase(createCarritoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCarritoThunk.fulfilled, (state, action) => {
        state.loading = false;
        // OPCIONAL: Si la API devuelve el item agregado, lo metemos al estado visualmente
        if (action.payload) {
             state.items.push(action.payload);
        }
      })
      .addCase(createCarritoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al agregar al carrito';
      })
      
      // --- UPDATE (Editar cantidad, etc) ---
      .addCase(updateCarritoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCarritoThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizamos el item en la lista local para que se vea el cambio
        const index = state.items.findIndex(item => item.id === action.meta.arg.id);
        if (index !== -1 && action.payload) {
            state.items[index] = action.payload;
        }
      })
      .addCase(updateCarritoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al actualizar item';
      })
      
      // --- DELETE ---
      .addCase(deleteCarritoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCarritoThunk.fulfilled, (state, action) => {
        state.loading = false;
        // CORREGIDO: 
        // 1. Usamos action.payload (que ahora es solo el ID)
        // 2. IMPORTANTE: Cambia 'item.id' por el nombre real de la propiedad ID en tu base de datos (ej: idItem, idDetalle)
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCarritoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al eliminar del carrito';
      })
  }
});

export const { clearError } = carritosSlice.actions;
export default carritosSlice.reducer;
