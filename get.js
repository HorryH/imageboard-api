import * as dynamoDbLib from "./helpers/dynamodb";
import { success, failure } from "./helpers/response";

export async function main(event, context, callback) {
  const params = {
    TableName: "imageboard-main",
    Key: {
      pid: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
