import axios from 'axios';
import { ApiRequest, GetManyOptions } from '../models/spacex.model';

const API_URL = 'https://api.spacexdata.com/v4';



export const list = async <T>({ query, options }: ApiRequest): Promise<T> => {

    console.log('query:', query, 'options:', options);
    try {
        const response = await axios.post<T>(`${API_URL}/launches/query`, { query, options });
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    }
};


export const filter = async <T>({ query, options }: ApiRequest): Promise<T> => {
    const payload = {
        query,
        options,
    };

    try {
        const response = await axios.post<T>(`${API_URL}/launches/query`, payload);
        return response.data;
    } catch (error) {
        console.error('Error filtering:', error);
        throw error;
    }
};

export const getMany = async <T>({ ids, options }: GetManyOptions): Promise<T> => {
    const payload = {
        query: { _id: { $in: ids } },
        options,
    };

    try {
        const response = await axios.post<T>(`${API_URL}/launches/query`, payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching many:', error);
        throw error;
    }
};