import {v1 as uuidv1} from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuidv1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };
    try {
        await dynamoDbLib.call("put",params);
        return success(params.Item);
    }
    catch (e) {
        console.log(e);
        return failure({status:false});
    }
}