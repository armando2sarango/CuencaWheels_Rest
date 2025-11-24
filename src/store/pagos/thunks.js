import { createAsyncThunk } from '@reduxjs/toolkit';
import * as pagoAPI from './restCalls';

// Obtener todos
export const fetchPagos = createAsyncThunk(
  'pagos/fetchAll',
  async () => {
    const data = await pagoAPI.getPagos();
    return data;
  }
);
export const fetchPagoById = createAsyncThunk(
  'pagos/fetchById',
  async (id) => {
    const data = await pagoAPI.getPagoById(id);
    return data;
  }
);

// Obtener por ID de Reserva
export const fetchPagosByReserva = createAsyncThunk(
  'pagos/fetchByReserva',
  async (idReserva) => {
    const data = await pagoAPI.getPagosByReserva(idReserva);
    return data;
  }
);

// Crear
export const createPagoThunk = createAsyncThunk(
  'pagos/create',
  async (body) => {
    const data = await pagoAPI.createPago(body);
    return data;
  }
);

// Actualizar
export const updatePagoThunk = createAsyncThunk(
  'pagos/update',
  async ({ id, body }) => {
    const data = await pagoAPI.updatePago(id, body);
    return data;
  }
);

// Eliminar
export const deletePagoThunk = createAsyncThunk(
  'pagos/delete',
  async (id) => {
    const success = await pagoAPI.deletePago(id);
    return { id, success };
  }
);
