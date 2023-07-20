import { PutCommand, QueryCommand, QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { getClient } from './dbClient';

const DYNAMO_TABLE_NAME = 'ecom';

export async function createDBItem(item: any): Promise<string> {
    const client = getClient();
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        Item: item,
    };
    const data = await client.send(new PutCommand(params));
    const result = JSON.stringify(data);
    return result;
}
