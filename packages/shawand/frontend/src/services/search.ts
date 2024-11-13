import { type ApiSearchResponse, type Data } from '../types';

export const searchService = async (search: string): Promise<[Error?, Data?]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/users?q=${search}`);

    if (!response.ok) {
      return [new Error(`Error searching data: ${response.statusText}`)];
    }

    const json = await response.json() as ApiSearchResponse;

    return [undefined, json.data];

  } catch (error) {
    if (error instanceof Error) {
      return [error];
    }
  }

  return [new Error('Unknown error')];
}
