/*
AWS SDK for JavaScript - What's new in Version 3
Version 3 of the SDK for JavaScript (V3) contains the following new features.

Modularized packages
Users can now use a separate package for each service.
*/

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

let client: DynamoDBDocumentClient = null;

export const getClient = (): DynamoDBDocumentClient => {
    if (client) return client;

    if (process.env.SERVER_ENV === "LOCAL") {
        client = new DynamoDBClient({
            region: 'us-east-1',
            endpoint: 'http://docker.for.mac.localhost:8000',
            credentials: {
                accessKeyId: 'fakeAccessKeyId',
                secretAccessKey: 'fakeSecretKeyId',
            },
        });
    } else {
        // Create an Amazon DynamoDB service client object.
        const ddbClient = new DynamoDBClient({ region: 'us-east-1' });
        // Create the DynamoDB document client.
        client = DynamoDBDocumentClient.from(ddbClient, {
            marshallOptions,
            unmarshallOptions,
        });
    }

    return client;

};
