import { AxiosResponse } from 'axios';

export const szedd_ki_a_válaszból_az_adatot = (válasz: AxiosResponse): string => válasz.data;
