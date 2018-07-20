import * as dynamoDbLib from "./dynamodb";

const imageboard = "imageboard-main"

export function getMain(pid, context, callback) {
  const params = {
    TableName: imageboard,
    Key: {
      pid: pid
    }
  };
  return dynamoDbLib.handledGet(params, context, callback);
}

export function createMain(item, context, callback) {
  const params = {
    TableName: imageboard,
    Item: item
  };
  return dynamoDbLib.handledPut(params, context, callback);
}

export function updateMain(pid, updateExpression, updateValues, context, callback) {
  const params = {
    TableName: imageboard,
    Key: {
      pid: pid
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: updateValues
  };
  return dynamoDbLib.handledUpdate(params, context, callback)
}