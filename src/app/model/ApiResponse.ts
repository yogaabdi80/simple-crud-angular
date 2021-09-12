export class ApiResponse<T> {
    status: number = null;
    message: string = null;
    result: T = null;
}