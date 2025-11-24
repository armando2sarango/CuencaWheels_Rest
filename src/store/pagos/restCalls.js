import { makeRequest, HttpMethod } from '../../services/restCall';

export async function getPagos() {
  try {
    const response = await makeRequest(HttpMethod.GET, '/pagos');
    
    if (!response.success) return [];
    // Tu JSON muestra que devuelve { data: [...] }
    return response.data?.data || []; 

  } catch (error) {
    return [];
  }
}

export async function getPagoById(id) {
  try {
    const response = await makeRequest(HttpMethod.GET, `/pagos/${id}`);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getPagosByReserva(idReserva) {
  try {
    const response = await makeRequest(HttpMethod.GET, `/pagos/reserva/${idReserva}`);
    if (!response.success) return [];
    // Asumimos que aquí también devuelve { data: [...] } o el array directo
    return response.data?.data || response.data || [];
  } catch (error) {
    return [];
  }
}

export async function createPago(body) {
  try {
    const response = await makeRequest(HttpMethod.POST, '/pagos', body);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    throw error; // Lanzamos el error para que el Thunk lo capture
  }
}

export async function updatePago(id, body) {
  try {
    const response = await makeRequest(HttpMethod.PUT, `/pagos/${id}`, body);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePago(id) {
  try {
    const response = await makeRequest(HttpMethod.DELETE, `/pagos/${id}`);
    return response.success;
  } catch (error) {
    throw error;
  }
}