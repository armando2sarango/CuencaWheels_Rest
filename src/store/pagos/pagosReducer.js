import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchPagos, 
  fetchPagosByReserva, 
  createPagoThunk, 
  updatePagoThunk, 
  deletePagoThunk,fetchPagoById
} from './thunks';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const pagosSlice = createSlice({
  name: 'pagos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL ---
      .addCase(fetchPagos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPagos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPagos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar pagos';
      })

      // --- FETCH BY RESERVA ---
      .addCase(fetchPagosByReserva.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPagosByReserva.fulfilled, (state, action) => {
        state.loading = false;
        // Podrías querer reemplazar items o guardarlo en otro estado, 
        // aquí reemplazamos la lista actual para mostrar solo los de esa reserva
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })

      // --- CREATE ---
      .addCase(createPagoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPagoThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(createPagoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al registrar pago';
      })

      // --- UPDATE ---
      .addCase(updatePagoThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(p => p.IdPago === action.meta.arg.id);
        if (index !== -1 && action.payload) {
          state.items[index] = action.payload;
        }
      })

      // --- DELETE ---
      .addCase(deletePagoThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
           state.items = state.items.filter(p => p.IdPago !== action.payload.id);
        }
      })
      // --- FETCH BY ID (PAGO INDIVIDUAL) ---
      .addCase(fetchPagoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPagoById.fulfilled, (state, action) => {
        state.loading = false;
        // TRUCO: Si devuelve un objeto único, lo metemos en un array []
        // Si devuelve null/vacío, array vacío
        state.items = action.payload ? [action.payload] : [];
      })
      .addCase(fetchPagoById.rejected, (state, action) => {
        state.loading = false;
        state.error = "No se encontró el pago con ese ID";
        state.items = [];
      });   
  }
  
  
});

export const { clearError } = pagosSlice.actions;
export default pagosSlice.reducer;
