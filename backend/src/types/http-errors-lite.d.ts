declare module 'http-errors-lite' {
    interface HttpError extends Error {
        status?: number;
        statusCode?: number;
        expose?: boolean;
    }

    interface CreateErrorFunction {
        (status: number, message?: string): HttpError;
        (message: string): HttpError;
    }

    const createError: CreateErrorFunction;
    export default createError;
}