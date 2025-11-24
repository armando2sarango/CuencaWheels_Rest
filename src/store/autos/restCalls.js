import { makeRequest, HttpMethod } from '../../services/restCall';
export async function getVehiculos() {
  try {
    const response = await makeRequest(HttpMethod.GET, '/vehiculos');
    
    if (!response.success) return [];
    return response.data; 

  } catch (error) {
    return [];
  }
}

export async function getVehiculoById(id) {
  try {
    const response = await makeRequest(HttpMethod.GET, `/vehiculos/${id}`);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    return null;
  }
}
export async function createVehiculo(body) {
  try {
    const response = await makeRequest(HttpMethod.POST, '/vehiculos', body);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateVehiculo(id, body) {
  try {
    const response = await makeRequest(HttpMethod.PUT, `/vehiculos/${id}`, body);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteVehiculo(id) {
  try {
    const response = await makeRequest(HttpMethod.DELETE, `/vehiculos/${id}`);
    return response.success;
  } catch (error) {
    throw error;
  }
}
export async function buscarVehiculos(params) {
  try {
    const query = new URLSearchParams();
    if (params.categoria) query.append('categoria', params.categoria);
    if (params.transmision) query.append('transmision', params.transmision);
    if (params.estado) query.append('estado', params.estado);

    const response = await makeRequest(HttpMethod.GET, `/vehiculos/buscar?${query.toString()}`);
    if (!response.success) return [];
    return response.data;

  } catch (error) {
    return [];
  }
}