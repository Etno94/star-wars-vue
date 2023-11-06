import {devEnvironment} from '../../environment/environment.dev';

export async function fetchSwData(apiURL: string) {
  try {
    const response = await fetch(apiURL || devEnvironment.baseApiURL);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('A network error occurred', error.message);
    } else {
      console.error('An error occurred', error);
    }
    throw error;
  }
}