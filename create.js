import uuid from "uuid";
import * as dynamoDbLib from "./helpers/dynamodb";
import { success, failure } from "./helpers/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "imageboard-main",
    Item: {
      pid: uuid.v1(),
      uid: event.requestContext.identity.cognitoIdentityId,
      content: data.content,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}