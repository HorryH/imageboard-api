import AWS from "aws-sdk";
import {failure, success} from "./response";

AWS.config.update({ region: "us-east-1" });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

export async function handledGet(params, context, callback) {
  try {
    const result = await call("get", params);
    if (result.Item) {
      return result.Item;
    } else {
      return null;
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}