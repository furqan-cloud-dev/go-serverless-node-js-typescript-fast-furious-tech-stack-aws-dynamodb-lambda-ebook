import { APIGatewayProxyResult } from 'aws-lambda';
import { ulid } from 'ulid';
import { headers } from '../app';
import { createDBItem } from '../crud';

export async function createEntity(entity: string, requestBody: string): Promise<APIGatewayProxyResult> {
    const json = JSON.parse(requestBody || '{}');
    const entityId = ulid();
    const today = new Date();
    const todayISODate = today.toISOString();

    const item: any = {
        pk: entity,
        sk: 'id#' + entityId,
        entity: entity,
        entityId: entityId,
        createdAt: todayISODate,
        updatedAt: todayISODate,
    };

    const dbItem: any = { ...item, ...json };

    const result = await createDBItem(dbItem);

    return {
        statusCode: 200,
        headers: headers,
        body: result,
    };
}
