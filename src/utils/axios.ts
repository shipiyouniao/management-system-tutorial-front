import Result from '@/types/Result';
import axios, { Axios } from 'axios';

/**
 * @description axios封装
 */
class Service {
    private baseURL: string = "http://localhost:8080";
    private service: Axios;

    constructor() {
        // 创建axios实例
        this.service = axios.create({
            baseURL: this.baseURL, // api的base_url
            //timeout: 10000 // 请求超时时间
        });

        // request拦截器
        this.service.interceptors.request.use(
            config => {
                return config;
            },
            error => {
                Promise.reject(error);
            }
        );

        // respone拦截器
        this.service.interceptors.response.use(
            res => {
                // 不需要axios自定义的res，只需要data即后端自定义的res
                return res.data as Result<any>;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    public async get(url: string, params: any = null) : Promise<Result<any>>{
        let error: boolean = false;

        let res = await this.service.get(url, { params: params }).catch(() => {
            error = true;
        });

        if (!error) {
            return res as unknown as Result<any>;
        }else {
            return {
                code: 500,
                msg: '请求失败',
                data: null
            }
        }
    }

    public async post(url: string, params: any) : Promise<Result<any>>{
        let error: boolean = false;

        let res = await this.service.post(url, params).catch(() => {
            error = true;
        });

        if (!error) {
            return res as unknown as Result<any>;
        }else {
            return {
                code: 500,
                msg: '请求失败',
                data: null
            }
        }
    }

    public async put(url: string, params: any) : Promise<Result<any>>{
        let error: boolean = false;

        let res = await this.service.put(url, params).catch(() => {
            error = true;
        });

        if (!error) {
            return res as unknown as Result<any>;
        }else {
            return {
                code: 500,
                msg: '请求失败',
                data: null
            }
        }
    }

    public async delete(url: string, params: any) : Promise<Result<any>>{
        let error: boolean = false;

        let res = await this.service.delete(url, { params: params }).catch(() => {
            error = true;
        });

        if (!error) {
            return res as unknown as Result<any>;
        }else {
            return {
                code: 500,
                msg: '请求失败',
                data: null
            }
        }
    }
}

export default new Service();