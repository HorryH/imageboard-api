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
    console.log("Results of the " + operation + " operation:");
    console.log(result);
    if (result.Item) {
      return result.Item;
    }
    return result;
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

export function handledScan(params, context, callback) {
  return genericHandledDBCall("scan", params, context, callback);
}