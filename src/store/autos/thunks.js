// store/vehicles/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as vehiculoAPI from './restCalls';

// Obtener todos los vehículos
export const fetchVehiculos = createAsyncThunk(
  'vehicles/fetchAll',
  async () => {
    const data = await vehiculoAPI.getVehiculos();
    return data;
  }
);

// Obtener vehículo por ID
export const fetchVehiculoById = createAsyncThunk(
  'vehicles/fetchById',
  async (id) => {
    const data = await vehiculoAPI.getVehiculoById(id);
    return data;
  }
);

// Crear vehículo
export const createVehiculoThunk = createAsyncThunk(
  'vehicles/create',
  async (body) => {
    const data = await vehiculoAPI.createVehiculo(body);
    return data;
  }
);

// Actualizar vehículo
export const updateVehiculoThunk = createAsyncThunk(
  'vehicles/update',
  async ({ id, body }) => {
    const data = await vehiculoAPI.updateVehiculo(id, body);
    return data;
  }
);

// Eliminar vehículo
export const deleteVehiculoThunk = createAsyncThunk(
  'vehicles/delete',
  async (id) => {
    const success = await vehiculoAPI.deleteVehiculo(id);
    return { id, success };
  }
);

export const buscarVehiculosThunk = createAsyncThunk(
  'vehicles/search',
  async (filtros) => {
    // filtros es un objeto { categoria, transmision, estado }
    const data = await vehiculoAPI.buscarVehiculos(filtros);
    return data;
  }
);
