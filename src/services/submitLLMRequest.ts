import axios from 'axios';
import type { ResponseType } from 'src/types/types';

export async function submitRequest(question: string): Promise<ResponseType> {
  try {
    const { data } = await axios.post('/api', { question });
    return data;
  } catch (error) {
    console.error('Error sending request:', error);
    return error;
  }
}
