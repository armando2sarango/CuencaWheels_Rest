// Este está bien, déjalo así.
import { apiClient } from './apiClient';

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export async function makeRequest(method, url, body) {
  try {
    const response = await apiClient.request({
      method,
      url,
      data: body,
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error };
  }
}