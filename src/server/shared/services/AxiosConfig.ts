import axios from 'axios';

export const axiosApp = axios.create({
    baseURL: 'https://tdsoft-auth.hsborges.dev/realms/trabalho-pratico',
    timeout: 5000,
});
