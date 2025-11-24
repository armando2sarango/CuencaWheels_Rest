// src/store/autos/autosReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchVehiculos,
  createVehiculoThunk,
  updateVehiculoThunk,
  deleteVehiculoThunk,buscarVehiculosThunk
} from './thunks';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const autosSlice = createSlice({
  name: 'autos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchVehiculos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehiculos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchVehiculos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar';
      })
      
      // Create
      .addCase(createVehiculoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVehiculoThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVehiculoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al crear';
      })
      
      // Update
      .addCase(updateVehiculoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVehiculoThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateVehiculoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al actualizar';
      })
      
      // Delete
      .addCase(deleteVehiculoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVehiculoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(v => v.IdVehiculo !== action.payload);
      })
      .addCase(deleteVehiculoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al eliminar';
      })
      // --- BÚSQUEDA ---
    .addCase(buscarVehiculosThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(buscarVehiculosThunk.fulfilled, (state, action) => {
      state.loading = false;
      // Reemplazamos la lista actual con los resultados de la búsqueda
      state.items = Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(buscarVehiculosThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error al buscar vehículos';
    });
  }
});

export const { clearError } = autosSlice.actions;
export default autosSlice.reducer;