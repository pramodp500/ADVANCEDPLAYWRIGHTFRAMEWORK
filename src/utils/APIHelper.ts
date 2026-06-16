import {Page,APIResponse , APIRequestContext} from "@playwright/test";

export type ApiContext = Page | APIRequestContext;
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request modification

export interface ApiRequestOptions {
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>;
    data?: unknown;
    params?: Record<string, string>;
    timeout?: number;
}

export interface RetryOptions {
    conditions: (response: APIResponse) => Promise<boolean>;
    pollingInterval?: number;
    retryCount?: number;
}

export class APIHelper {
    private context: ApiContext;
    constructor(context: ApiContext) {
        this.context = context;
    }

    private getRequest(): APIRequestContext {
        if ('request' in this.context) {
            return this.context.request;
        }        return this.context as APIRequestContext;
    }

    private buildUrl(url: string, params?: Record<string, string>): string {
        if (!params) return url;
        const queryString = new URLSearchParams(params).toString();
        return `${url}?${queryString}`;
    }

    async callApi(options: ApiRequestOptions): Promise<APIResponse> {
        const { url, method, headers, data, params, timeout } = options;
        const request = this.getRequest();
        const fullUrl = this.buildUrl(url, params);
       switch (method) {
            case 'GET':
                return await request.get(fullUrl, { headers, timeout });
            case 'POST':
                return await request.post(fullUrl, { headers, data, timeout });
            case 'PUT':
                return await request.put(fullUrl, { headers, data, timeout });
            case 'DELETE':
                return await request.delete(fullUrl, { headers, timeout });
            case 'PATCH':
                return await request.patch(fullUrl, { headers, data, timeout });
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        };

  
    }
    async retryApiCall(options: ApiRequestOptions, retryOptions: RetryOptions): 
    Promise<APIResponse> {
        const { conditions, pollingInterval = 5000, retryCount = 3 } = retryOptions;
        let lastResponse: APIResponse | null = null;
        for (let attempt = 1; attempt < retryCount; attempt++) {
            lastResponse = await this.callApi(options);
            if (await conditions(lastResponse)) {
                return lastResponse;
            }
            if (attempt < retryCount ) {
                await new Promise(resolve => setTimeout(resolve, pollingInterval));
            }
        }
        return lastResponse!;
    }

    async get(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<APIResponse> {
        return this.callApi({ url, method: 'GET', ...options });
    }
    async post(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<APIResponse> {
        return this.callApi({ url, method: 'POST', ...options });
    }
    async put(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<APIResponse> {
        return this.callApi({ url, method: 'PUT', ...options });
    }
    async delete(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<APIResponse> {
        return this.callApi({ url, method: 'DELETE', ...options });
    }
    async patch(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<APIResponse> {
        return this.callApi({ url, method: 'PATCH', ...options });
    }
    async parseJsonResponse<T>(response: APIResponse): Promise<T> {
        return await response.json() as T;
       
    }   

    isSuccessStatus(status: number): boolean {
        return status >= 200 && status < 300;
    }
    isFailureStatus(status: number): boolean {
        return status >= 400;
    }
}
