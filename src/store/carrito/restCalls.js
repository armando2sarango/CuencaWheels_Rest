import { makeRequest, HttpMethod } from '../../services/restCall';
import { getVehiculoById } from '../autos/restCalls';
export async function getcarrito(idCarrito) {
  try {
    const response = await makeRequest(HttpMethod.GET, `/carrito/${idCarrito}/detalle`);
    if (!response.success) return [];
    const datos = response.data; 
    
    if (datos && Array.isArray(datos.Items)) {
      // 2. LÓGICA NUEVA: "Enriquecer" los ítems con la imagen
        const itemsConImagen = await Promise.all(datos.Items.map(async (item) => {
            // Si el ítem tiene un ID de vehículo, buscamos sus datos completos
            if (item.IdVehiculo) {
                const datosVehiculo = await getVehiculoById(item.IdVehiculo);
                return {
                    ...item, 
                    // Le pegamos la imagen del vehículo al ítem del carrito
                    UrlImagen: datosVehiculo?.UrlImagen || null 
                };
            }
            return item;
        }));

        return itemsConImagen;
    }
    return []; 

  } catch (error) {
    return [];

  }
}

export async function createCarrito(body) {
  try {
    const response = await makeRequest(HttpMethod.POST, '/carrito/agregar', body);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCarrito(id, body) {
  try {
    const response = await makeRequest(HttpMethod.PUT, `/carrito/item/${id}`, body);
    if (!response.success) return null;
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCarrito(id) {
  try {
    const response = await makeRequest(HttpMethod.DELETE, `/carrito/item/${id}`);
    return response.success;
  } catch (error) {
    throw error;
  }
}