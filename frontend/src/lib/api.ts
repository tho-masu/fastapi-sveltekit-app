import type { HelloWorldResponse, QueryResponse, HealthResponse, ApiError } from './types';

const API_BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:8000'
    : 'http://backend:8000';

class ApiClient {
    private async request<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (!response.ok) {
            const error: ApiError = {
                detail: `HTTP error! status: ${response.status}`,
                status: response.status
            };
            throw error;
        }
        
        return response.json();
    }

    async getHelloWorld(): Promise<HelloWorldResponse> {
        return this.request<HelloWorldResponse>('/api');
    }

    async getQueryData(): Promise<QueryResponse> {
        return this.request<QueryResponse>('/api/query');
    }

    async getHealth(): Promise<HealthResponse> {
        return this.request<HealthResponse>('/api/health');
    }
}

export const apiClient = new ApiClient();
