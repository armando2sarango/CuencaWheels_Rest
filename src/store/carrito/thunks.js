import { createAsyncThunk } from '@reduxjs/toolkit';
import * as carritoAPI from './restCalls';

// CORREGIDO: Ahora acepta idCarrito como argumento
export const fetchCarritos = createAsyncThunk(
  'carrito/fetchAll',
  async (idCarrito) => {
    const data = await carritoAPI.getcarrito(idCarrito);
    return data;
  }
);

export const createCarritoThunk = createAsyncThunk(
  'carrito/create',
  async (body) => {
    const data = await carritoAPI.createCarrito(body);
    return data;
  }
);

export const updateCarritoThunk = createAsyncThunk(
  'carrito/update',
  async ({ id, body }) => {
    const data = await carritoAPI.updateCarrito(id, body);
    return data; // Usualmente devuelve el item actualizado
  }
);

export const deleteCarritoThunk = createAsyncThunk(
  'carrito/delete',
  async (id) => {
    await carritoAPI.deleteCarrito(id);
    return id; // CORREGIDO: Devolvemos solo el ID para que el reducer sepa qué borrar
  }
);