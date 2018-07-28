import * as dynamoDbLib from "./dynamodb";

const imageboard = "imageboard-main";
const ibRank = "imageboard-rank";

export function getMain(pid, ...args) {
  const params = {
    TableName: imageboard,
    Key: {
      pid: pid
    }
  };
  return dynamoDbLib.handledGet(params, ...args);
}

export function createMain(item, ...args) {
  const params = {
    TableName: imageboard,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}

export function updateMain(pid, updateExpression, updateValues, ...args) {
  const params = {
    TableName: imageboard,
    Key: {
      pid: pid
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: updateValues
  };
  return dynamoDbLib.handledUpdate(params, ...args);
}

export function createRank(item, ...args) {
  const params = {
    TableName: ibRank,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}

export function getRanks(exclusiveStartKey, ...args) {
  const params = {
    TableName: ibRank,
    AttributesToGet: [
      "pid"
    ],
    Limit: 1000
  };
  if (exclusiveStartKey)
    params.ExclusiveStartKey = exclusiveStartKey;
  return dynamoDbLib.handledScan(params, ...args)
}