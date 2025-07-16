export const normalPath = (path: string) => {
    return path.startsWith("/") ? path : `/${path}`;
};

export class HttpError {
    constructor(
        public message: string,
        public status: number
    ) {
        this.message = message;
        this.status = status;
    }
}

export class ErrorUnauthorized extends HttpError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export const httpInstance = async <Res>(
    path: string,
    method: Method,
    data: unknown,
    config: RequestInit
) => {
    const fullUrl = process.env.NEXT_PUBLIC_BASE_URL + normalPath(path);
    const isFormData = data instanceof FormData;
    const res = await fetch(fullUrl, {
        method: method,
        body: isFormData ? data : JSON.stringify(data),
        headers: {
            ...(isFormData
                ? {}
                : { "Content-Type": "application/json", Accept: "application/json" }),
            ...config.headers,
        },
        ...config,
    }).then(async res => {
        const data = await res.json();
        if (res.ok) {
            return data as Res;
        }

        if (res.status === 401) {
            throw new ErrorUnauthorized(data.message);
        }

        throw new Error(res.statusText);
    });
    return res;
};

export const http = {
    get: async <Res>(path: string, config: RequestInit = {}) => {
        return httpInstance<Res>(path, "GET", undefined, config);
    },
    post: async <Res>(path: string, data: unknown, config: RequestInit = {}) => {
        return httpInstance<Res>(path, "POST", data, config);
    },
    put: async <Res>(path: string, data: unknown, config: RequestInit = {}) => {
        return httpInstance<Res>(path, "PUT", data, config);
    },
    delete: async <Res>(path: string, config: RequestInit = {}) => {
        return httpInstance<Res>(path, "DELETE", undefined, config);
    },
};
