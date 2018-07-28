import * as dynamoDbLib from "./dynamodb";

const imageboard = "imageboard-main";
const ibRank = "imageboard-rank";

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

export function createRank(item, context, callback) {
  const params = {
    TableName: ibRank,
    Item: item
  };
  return dynamoDbLib.handledPut(params, context, callback);
}

export function getRanks(exclusiveStartKey, context, callback) {
  const params = {
    TableName: ibRank,
    AttributesToGet: [
      "pid"
    ],
    Limit: 1000
  };
  if (exclusiveStartKey)
    params.ExclusiveStartKey = exclusiveStartKey;
  return dynamoDbLib.handledScan(params, context, callback)
}