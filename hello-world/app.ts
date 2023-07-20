/**
    eBook Example Project:
    "Go Serverless Fast & Furious- A Cost Effective TechStack: Node.js + AWS Cloud"

    TechStack: Node.js + Typescript + ESBuild + Lambda + APIGateway + DynamoDB + AWS SAM Tools(local testing + deployment)

    Created BY:
    Muhammad Furqan
    Software Developer / Solution Architect
    Email: furqan.cloud.dev@gmail.com
    Linkedin: https://www.linkedin.com/in/muhammad-furqan-121b691a 
    Github: https://github.com/furqan-cloud-dev
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sendErrorResponse } from './utility';
import { createEntity } from './controllers/entityController';

export const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,PUT,DELETE',
};

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const path = event.path;
    if (path === undefined) {
        return sendErrorResponse(404, 'node.js rest api - expecting an APIGatewayEvent Request');
    }

    const httpMethod = event.httpMethod.toLowerCase();

    const pathArray = event.path.split('/');
    // e-Route check : /api/e/users  - POST | PUT | DELETE
    const [emp, api, eRoute, entity, entityId] = pathArray;

    try {
        switch (httpMethod) {
            case 'post':
                if (emp + '/' + api + '/' + eRoute == '/api/e') {
                    // e-Route - Create Entity
                    const result = await createEntity(entity, event.body);
                    return result;
                }
                break;

            default:
                return sendErrorResponse(404, 'not found');
        }
    } catch (err: any) {
        console.log('Error:', err);
        return sendErrorResponse(500, err.message);
    }
};
