export class HttpClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "HttpClientError";
    }
}

export class NetworkError extends HttpClientError {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

export class ServerError extends HttpClientError {
    constructor(message: string) {
        super(message);
        this.name = "ServerError";
    }
}

export class ClientError extends HttpClientError {
    constructor(
        message: string,
        public readonly status?: number
    ) {
        super(message);
        this.name = "ClientError";
        this.handler(status)
    }

    handler(status?: number){
        if (status === 403){
            window.location.href = '/auth/login'
        }
    }
}
