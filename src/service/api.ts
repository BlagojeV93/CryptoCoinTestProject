import axios, { AxiosError, AxiosResponse } from 'axios';
import Config from '../../config/config.json'
import CURRENCIES from '../helpers/constants/Currencies';
import { Crypto } from '../model/CryptoModel';

const axiosDefaultOptions = {
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
    },
};

class Api {
    _apiConfig;

    constructor(baseURL: string) {
        this._apiConfig = axios.create({
            baseURL: `${baseURL}`,
            ...axiosDefaultOptions,
        });

        this._initializeResponseInterceptor();
    }

    _initializeResponseInterceptor = () => {
        this._apiConfig.interceptors.response.use(
            this._handleResponse,
            this._handleError
        );
    };

    _handleResponse = (response: AxiosResponse) => response;

    _handleError = (error: AxiosError) => Promise.reject(error)

    getCoinsInformation = async (page: number, currency = CURRENCIES.USD): Promise<Crypto[]> => {
        const { data } = await this._apiConfig.get(`/coins/markets?vs_currency=${currency}&page=${page}`)
        return data
    }
}

class ApiInitializator {
    _endpointInstance: Api | undefined

    init = () => {
        if (this._endpointInstance) {
            console.warn('Api has already been initialized');
            return;
        }
        this._endpointInstance = new Api(Config.API_ENDPOINT);
    };

    getEndpoints = () => {
        if (!this._endpointInstance) {
            throw new Error(
                'You are trying to call an api endpoint but the api instance has not been initialized yet.'
            );
        }
        return this._endpointInstance;
    };
}

const axiosApiInstanceInitializator = new ApiInitializator();

export default axiosApiInstanceInitializator;
