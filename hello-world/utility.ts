import { APIGatewayProxyResult } from 'aws-lambda';
import { headers } from './app';

export function sendErrorResponse(statusCode: number, message: string): APIGatewayProxyResult {
    return {
        statusCode: statusCode,
        headers: headers,
        body: JSON.stringify({
            message: message,
        }),
    };
}

export function badRequest(error: object): APIGatewayProxyResult {
    return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({
            error: error,
        }),
    };
}
