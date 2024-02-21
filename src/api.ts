import axios from 'axios';

export async function fetchKeanuImage(): Promise<string> {
  try {
    const response = await axios.get('https://placekeanu.com/200/300');
    return response.request.res.responseUrl;
  } catch (error) {
    throw new Error(`Failed to fetch Keanu image: ${error}`);
  }
}