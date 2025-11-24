import { createSlice } from '@reduxjs/toolkit';
import {
  fetchReservas,
  fetchReservaById,
  fetchReservasIdUsuario,
  createReservaThunk,
  updateReservaThunk,
  updateEstadoReservaThunk,
  deleteReservaThunk
} from './thunks';

const initialState = {
  items: [],          // Lista de reservas
  selectedItem: null, // Reserva individual (para detalles)
  loading: false,
  error: null
};

const reservasSlice = createSlice({
  name: 'reservas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelection: (state) => {
      state.selectedItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL (ADMIN) ---
      .addCase(fetchReservas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchReservas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar reservas';
      })

      // --- FETCH BY USUARIO ---
      .addCase(fetchReservasIdUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservasIdUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchReservasIdUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar reservas del usuario';
      })

      // --- FETCH SINGLE BY ID ---
      .addCase(fetchReservaById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      })

      // --- CREATE ---
      .addCase(createReservaThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservaThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload); // Agregamos a la lista local
        }
      })
      .addCase(createReservaThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear reserva';
      })

      // --- UPDATE ---
      .addCase(updateReservaThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizamos en la lista
        const index = state.items.findIndex(r => r.IdReserva === action.meta.arg.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })

      // --- UPDATE ESTADO ---
      .addCase(updateEstadoReservaThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizamos solo el estado en la lista local
        const index = state.items.findIndex(r => r.IdReserva === action.payload.id);
        if (index !== -1) {
           // Si la API devuelve el objeto completo, úsalo. Si no, actualiza manualmente.
           if (action.payload.data) {
               state.items[index] = action.payload.data;
           }
        }
      })

      // --- DELETE ---
      .addCase(deleteReservaThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Filtramos usando el ID que devolvió el thunk
        state.items = state.items.filter(r => r.IdReserva !== action.payload);
      });
  }
});

export const { clearError, clearSelection } = reservasSlice.actions;
export default reservasSlice.reducer;
