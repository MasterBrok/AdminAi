import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-settings';
import { ApiResponse, ApiResponseWithData } from './api-response.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
    isAuthenticated(): boolean {
        return true;
    }
    constructor(private http: HttpClient) { }

    getShort<T = any>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${API_BASE_URL}/${endpoint}`, { withCredentials: true });
    }
    get<T = any>(endpoint: string, params?: any): Observable<ApiResponseWithData<T>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<ApiResponseWithData<T>>(`${API_BASE_URL}/${endpoint}`, { params: httpParams, withCredentials: true });
    }

    post(endpoint: string, body: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${API_BASE_URL}/${endpoint}`, body, { withCredentials: true });
    }

    put(endpoint: string, body: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${API_BASE_URL}/${endpoint}`, body, { withCredentials: true });
    }

    delete<T = any>(endpoint: string, params?: any): Observable<ApiResponseWithData<T> | ApiResponse> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.delete<ApiResponseWithData<T> | ApiResponse>(`${API_BASE_URL}${endpoint}`, { params: httpParams });
    }
}
