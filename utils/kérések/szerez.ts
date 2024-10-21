import axios from 'axios';

export const hívd_le_az_oldalt_axiossal = async (oldal: string) => await axios.get(oldal);
