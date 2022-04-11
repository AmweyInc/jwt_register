import $api from '../http'
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/Response/AuthResponse";


export default class AuthService{

    static async login(email:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        // @ts-ignore
        return $api.post<AuthResponse>('/login',{email,password})
            .then(response => response.data.accessToken);
    }

    static async registration(email:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        // @ts-ignore
        return $api.post<AuthResponse>('/registration',{email,password})
            .then(response => response.data.accessToken);
    }
    static async logout():Promise<void>{
        // @ts-ignore
        return $api.post<AuthResponse>('/logout')
    }
}
