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

export function handledGet(...args) {
  return genericHandledDBCall("get", ...args);
}

export function handledPut(...args) {
  return genericHandledDBCall("put", ...args);
}

export function handledUpdate(...args) {
  return genericHandledDBCall("update", ...args);
}

export function handledQuery(...args) {
  return genericHandledDBCall("query", ...args);
}

export function handledScan(...args) {
  return genericHandledDBCall("scan", ...args);
}

export function handledBatchGet(...args) {
  return genericHandledDBCall("batchGet", ...args);
}