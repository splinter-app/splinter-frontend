import axios from 'axios';
import type { ResponseType } from 'src/types/types';

const APIGatewayURL = 'https://20e7ss4l5b.execute-api.us-east-1.amazonaws.com/prod/sandbox/prompt';

export async function submitRequest(question: string): Promise<ResponseType> {
  try {
    const { data } = await axios.post('/api/prompt', { question });
    return data;
  } catch (error) {
    console.error('Error sending request:', error);
    return error;
  }
}
