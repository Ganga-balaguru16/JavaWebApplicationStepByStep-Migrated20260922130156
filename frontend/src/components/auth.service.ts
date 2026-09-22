import axios from 'axios';

interface LoginResponse {
  success: boolean;
  errorMessage?: string;
}

/**
 * Sends login credentials to the backend.
 * Expects the backend to respond with JSON:
 *   { success: true } on success
 *   { success: false, errorMessage: "..." } on failure
 */
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const params = new URLSearchParams();
  params.append('name', username);
  params.append('password', password);

  const response = await axios.post<LoginResponse>('/login.do', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};