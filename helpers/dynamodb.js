import AWS from "aws-sdk";
import {failure, success} from "./response";

AWS.config.update({ region: "us-east-1" });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

export async function genericHandledDBCall(operation, params, context, callback) {
  try {
    const result = await call(operation, params);
    if (result.Item) {
      return result.Item;
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
  return null;
}

export function handledGet(params, context, callback) {
  return genericHandledDBCall("get", params, context, callback);
}

export function handledPut(params, context, callback) {
  return genericHandledDBCall("put", params, context, callback);
}

export function handledUpdate(params, context, callback) {
  return genericHandledDBCall("update", params, context, callback);
}