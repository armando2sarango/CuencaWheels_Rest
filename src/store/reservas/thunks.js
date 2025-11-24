import { createAsyncThunk } from '@reduxjs/toolkit';
import * as reservaAPI from './restCalls';

// Traer todas (Admin)
export const fetchReservas = createAsyncThunk(
  'reserva/fetchAll',
  async () => {
    // CORREGIDO: Se agregaron paréntesis () y nombre correcto
    const data = await reservaAPI.getReservas(); 
    return data;
  }
);

// Traer una sola por ID
export const fetchReservaById = createAsyncThunk(
  'reserva/fetchById', // CORREGIDO: Nombre único
  async (id) => {
    const data = await reservaAPI.getReservaById(id);
    return data;
  }
);

// Traer reservas de un usuario
export const fetchReservasIdUsuario = createAsyncThunk(
  'reserva/fetchByUsuario', // CORREGIDO: Nombre único
  async (idUsuario) => {
    const data = await reservaAPI.getReservaByIdUsuario(idUsuario);
    return data;
  }
);

export const createReservaThunk = createAsyncThunk(
  'reserva/create',
  async (body) => {
    // CORREGIDO: Nombre de la función createReserva (CamelCase)
    const data = await reservaAPI.createReserva(body);
    return data;
  }
);

export const updateReservaThunk = createAsyncThunk(
  'reserva/update',
  async ({ id, body }) => {
    const data = await reservaAPI.updateReserva(id, body);
    return data;
  }
);

// Nuevo Thunk para cambio de estado
export const updateEstadoReservaThunk = createAsyncThunk(
  'reserva/updateEstado',
  async ({ id, estado }) => {
    const data = await reservaAPI.updateEstado(id, estado);
    return { id, data }; 
  }
);

export const deleteReservaThunk = createAsyncThunk(
  'reserva/delete',
  async (id) => {
    await reservaAPI.deleteReserva(id);
    return id; 
  }
);