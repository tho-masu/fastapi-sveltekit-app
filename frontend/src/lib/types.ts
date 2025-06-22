export interface HelloWorldResponse {
    message: string;
}

export interface QueryResponse {
    data: string;
    timestamp: string;
}

export interface HealthResponse {
    status: string;
    service: string;
}

export interface ApiError {
    detail: string;
    status: number;
}
