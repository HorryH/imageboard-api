import * as dynamoDbLib from "./dynamodb";

const imageboard = "imageboard-main";
const imageboardRank = "imageboard-rank";
const imageboardVotes = "imageboard-votes";

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
    TableName: imageboardRank,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}

export function getRanks(exclusiveStartKey, ...args) {
  const params = {
    TableName: imageboardRank,
    AttributesToGet: [
      "pid"
    ],
    Limit: 1000
  };
  if (exclusiveStartKey)
    params.ExclusiveStartKey = exclusiveStartKey;
  return dynamoDbLib.handledScan(params, ...args)
}

export function updateRank(pid, updateExpression, updateValues, ...args) {
  const params = {
    TableName: imageboardRank,
    Key: {
      pid: pid
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: updateValues
  };
  return dynamoDbLib.handledUpdate(params, ...args);
}

export function getVote(uid, pid, ...args) {
  const params = {
    TableName: imageboardVotes,
    Key: {
      uid: uid,
      pid: pid
    },
    ProjectionExpression: "vote"
  };
  return dynamoDbLib.handledGet(params, ...args);
}

export function createVote(item, ...args) {
  const params = {
    TableName: imageboardVotes,
    Item: item
  };
  return dynamoDbLib.handledPut(params, ...args);
}